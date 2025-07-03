import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {dashboardTool} from '@sanity/dashboard'
import {frFRLocale} from '@sanity/locale-fr-fr';

import {schemaTypes} from './schemaTypes';
import OpeningDetails from './components/OpeningDetails';
import { deployDashboardWidget } from './components/dashboard';


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
      title: "Edition",
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
          S.listItem()
            .title('Ouvertures')
            .schemaType('opening')
            .child(
              S.documentTypeList('opening')
                .title('Ouvertures')
                .child(documentId =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('opening')
                    .views([
                      S.view.form().title("Editeur"),
                      S.view.component(OpeningDetails)
                        .title('Détails')
                    ])
                )
            )
        ]),
    }),
    dashboardTool({ widgets: [deployDashboardWidget()]})
],

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
