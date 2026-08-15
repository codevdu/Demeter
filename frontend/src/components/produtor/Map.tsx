import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldTopology from "world-atlas/countries-110m.json";
import { ChoroplethChart, ChoroplethFeatureComponent, ChoroplethGraticule, ChoroplethTooltip } from "../charts/choropleth";
import { Geometry } from "geojson";

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    geometry: Geometry;
    properties: {
      name?: string;
      id?: string | number;
      [key: string]: unknown;
    };
  }>;
}

type WorldTopology = Topology<{
  countries: GeometryCollection;
  land: GeometryCollection;
}>;

const topology = worldTopology as unknown as WorldTopology;

const geojson = topojson.feature(
  topology,
  topology.objects.countries
) as unknown as FeatureCollection;

export default function WorldMap() {
  return (
    <ChoroplethChart data={geojson} aspectRatio="16 / 9">
      <ChoroplethGraticule />
      <ChoroplethFeatureComponent fill="var(--chart-scale-03)" />
      <ChoroplethTooltip />
    </ChoroplethChart>
  );
}