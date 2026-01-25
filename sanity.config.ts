import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

if (!projectId || projectId === "votre_project_id") {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID manquant ou invalide. Copiez env.example vers .env.local, renseignez votre Project ID Sanity (https://sanity.io/manage), puis redémarrez le serveur."
  );
}

export default defineConfig({
  name: "angel-graphic",
  title: "ANGEL GRAPHIC",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
