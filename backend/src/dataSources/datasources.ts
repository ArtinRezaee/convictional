import ConvictionalDatasource from "./ConvictionalDatasource";

type Datasources = [ConvictionalDatasource];

let datasources: Datasources;

export const initializeDatasources = (): void => {
  datasources = [new ConvictionalDatasource()];
};

export const getDatasources = (): Datasources => {
  return datasources;
};
