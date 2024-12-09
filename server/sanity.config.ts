import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {frFRLocale} from '@sanity/locale-fr-fr' 
import {schemaTypes} from './schemaTypes'


// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["globalConfiguration"])

export default defineConfig({
  name: 'default',
  title: 'Polak pizza',

  projectId: 'ood03zu3',
  dataset: 'production',

  plugins: [
    frFRLocale(),
    structureTool(  {
    structure: (S) =>
      S.list()
        .title("Données")
        .items([

          // Our singleton type has a list item with a custom child
          S.listItem()
            .title("Informations générales")
            .id("globalConfiguration")
            .child(
              // Instead of rendering a list of documents, we render a single
              // document, specifying the `documentId` manually to ensure
              // that we're editing the single instance of the document
              S.document()
                .schemaType("globalConfiguration")
                .documentId("globalConfigurationSingleton")
            ),
          S.documentTypeListItem("pizza").title("Pizza au menu"),
          S.documentTypeListItem("opening").title("Ouvertures"),
        ]),
  }), visionTool()],

  schema: {
    types: schemaTypes,
        templates:   (templates) =>
          templates.filter(({ schemaType }) => ["pizza", "opening"].includes(schemaType)),
  },

  document: {
    // For singleton types, filter out actions that are not explicitly included
    // in the `singletonActions` list defined above
    actions: (input, context) =>    
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
