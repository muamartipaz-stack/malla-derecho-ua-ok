body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
  color: #222;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.container-semestres {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
  padding: 0 10px;
}

.semestre {
  background-color: #1a1a1a;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
  min-width: 220px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.semestre h2 {
  text-align: center;
  font-size: 18px;
  color: #ddd;
  margin-bottom: 10px;
}

.ramo {
  display: block;
  width: 100%;
  margin: 6px 0;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  text-align: left;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.ramo:hover:not(.locked) {
  background-color: #444;
}

.ramo.locked {
  background-color: #888;
  cursor: not-allowed;
}

.ramo.completed {
  background-color: #2ecc71;
  color: white;
}
