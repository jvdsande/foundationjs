import { SchemaType } from './schema-types'
import { Property, PropertySchema } from './type'

export type Model = {
  name: string,
  external?: boolean,
  schema: PropertySchema | Property | Schema,
  fields?: RootFields,
  scopes?: Scopes,

  accessor?: string,
}

export type SanitizedModel = {
  name: string,
  external: boolean,
  schema: Property,
  fields: RootFields,
  scopes: Scopes,
  accessor: string,
}

export type Schema = {
  [key: string]: SchemaEntry
}

export type SchemaEntry = SchemaType | Schema

export type RootFields = {
  fields: Fields,
  queries: Fields,
  mutations: Fields,
}

export type Fields = {
  [key: string]: Field
}

export type Field = {
  type?: PropertySchema | Property
  args?: PropertySchema,
  extends?: string,
  resolve: (any: any) => any
  mode?: FieldModeEnum | FieldModeEnum[]
}

export type FieldModeEnum = 'OUTPUT' | 'INPUT'

export type Scopes = {
  [key: string]: Scope
}

export type Scope = (arg: ScopeParams) => any

export type ScopeParams = {
  args: any,
  context: any
}

export const FieldMode: { [key: string]: FieldModeEnum } = {  // eslint-disable-line
  OUTPUT: 'OUTPUT',
  INPUT: 'INPUT',
}
