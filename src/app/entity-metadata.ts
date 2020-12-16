import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Todo: {
    entityDispatcherOptions: {
      optimisticDelete: true,
      optimisticAdd: true,
    }
  }
};

const pluralNames = {
  Todo: "Todoes"
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
