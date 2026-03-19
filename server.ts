import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const DATA_FILE = path.join(process.cwd(), "data.json");

  // Initialize data file if not exists
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
      participants: [],
      categories: [
        { id: "cat-1", name: "Seni Islami" },
        { id: "cat-2", name: "Pengetahuan Agama" }
      ],
      branches: [
        { id: "br-1", name: "Tilawah", categoryId: "cat-1" },
        { id: "br-2", name: "Hifdzil Qur'an", categoryId: "cat-1" },
        { id: "br-3", name: "Seni Kaligrafi", categoryId: "cat-1" },
        { id: "br-4", name: "LCC PAI", categoryId: "cat-2" }
      ],
      schools: [
        { id: "sch-1", name: "SD Negeri 1 Mapsi", lotteryNumber: "001" }
      ],
      scores: [],
      paniteras: [],
      juries: [],
      logo: "",
      subtitle: "Tingkat Sekolah Dasar Tahun 2026"
    }, null, 2));
  }

  // API Routes
  app.get("/api/data", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    if (!data.paniteras) data.paniteras = []; // Ensure paniteras exists
    if (!data.juries) data.juries = []; // Ensure juries exists
    res.json(data);
  });

  app.post("/api/paniteras", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const newPanitera = {
      id: `PAN-${Date.now()}`,
      ...req.body
    };
    if (!data.paniteras) data.paniteras = [];
    data.paniteras.push(newPanitera);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newPanitera);
  });

  app.post("/api/juries", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const newJury = {
      id: `JURY-${Date.now()}`,
      ...req.body
    };
    if (!data.juries) data.juries = [];
    data.juries.push(newJury);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newJury);
  });

  app.put("/api/juries/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const index = data.juries.findIndex((j: any) => j.id === req.params.id);
    if (index > -1) {
      data.juries[index] = { ...data.juries[index], ...req.body };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      res.json(data.juries[index]);
    } else {
      res.status(404).json({ error: "Jury not found" });
    }
  });

  app.delete("/api/juries/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    if (data.juries) {
      data.juries = data.juries.filter((j: any) => j.id !== req.params.id);
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    }
    res.json({ success: true });
  });

  app.delete("/api/paniteras/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    if (data.paniteras) {
      data.paniteras = data.paniteras.filter((p: any) => p.id !== req.params.id);
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    }
    res.json({ success: true });
  });

  app.post("/api/participants", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const newParticipant = {
      id: `MAPSI-${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    data.participants.push(newParticipant);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newParticipant);
  });

  app.put("/api/participants/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const index = data.participants.findIndex((p: any) => p.id === req.params.id);
    if (index > -1) {
      data.participants[index] = { ...data.participants[index], ...req.body };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      res.json(data.participants[index]);
    } else {
      res.status(404).json({ error: "Participant not found" });
    }
  });

  app.delete("/api/participants/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    data.participants = data.participants.filter((p: any) => p.id !== req.params.id);
    // Also remove scores for this participant
    data.scores = data.scores.filter((s: any) => s.participantId !== req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  });

  app.post("/api/categories", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const newCategory = {
      id: `CAT-${Date.now()}`,
      ...req.body
    };
    data.categories.push(newCategory);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newCategory);
  });

  app.delete("/api/categories/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    data.categories = data.categories.filter((c: any) => c.id !== req.params.id);
    // Also remove branches associated with this category
    data.branches = data.branches.filter((b: any) => b.categoryId !== req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  });

  app.post("/api/branches", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const newBranch = {
      id: `BR-${Date.now()}`,
      ...req.body
    };
    data.branches.push(newBranch);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newBranch);
  });

  app.delete("/api/branches/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    data.branches = data.branches.filter((b: any) => b.id !== req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  });

  app.post("/api/schools", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const newSchool = {
      id: `SCH-${Date.now()}`,
      ...req.body
    };
    data.schools.push(newSchool);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newSchool);
  });

  app.delete("/api/schools/:id", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    data.schools = data.schools.filter((s: any) => s.id !== req.params.id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  });

  app.post("/api/scores", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const { participantId, branchId, score1, score2, score3, score } = req.body;
    
    const existingScoreIndex = data.scores.findIndex(
      (s: any) => s.participantId === participantId && s.branchId === branchId
    );

    const scoreObj = { participantId, branchId, score1, score2, score3, score };

    if (existingScoreIndex > -1) {
      data.scores[existingScoreIndex] = scoreObj;
    } else {
      data.scores.push(scoreObj);
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
  });

  app.post("/api/logo", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const { logo } = req.body;
    data.logo = logo;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, logo });
  });

  app.post("/api/subtitle", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    const { subtitle } = req.body;
    data.subtitle = subtitle;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, subtitle });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
