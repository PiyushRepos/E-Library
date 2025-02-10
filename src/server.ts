import app from "./app";
import config from "./config/config";
import connectDB from "./config/db";

(async () => {
  const PORT = config.port || 3000;
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
})();
