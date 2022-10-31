import '#Config/env.js';
import connectDB from '#Config/db.js';
import httpServer from '#Config/http.js';
console.clear();
const bootstrap = async () => {
  await connectDB(process.env.MONGODB_URL);
  httpServer.listen(process.env.PORT, () =>
    console.log('created server in the port', process.env.PORT)
  );
};
bootstrap();
