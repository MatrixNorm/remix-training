/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Schema for the Character endpoint
 */
export interface Character {
  id: string;
  name: string;
  films?: string[];
  [k: string]: unknown;
}
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Schema for the Fiml endpoint
 */
export interface Film {
  id: string;
  title: string;
  description?: string;
  image?: string;
  movie_banner?: string;
  release_date?: number;
  characters?: string[];
  [k: string]: unknown;
}
