/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CheckoutInput = {
  products: Array<CheckoutProductInput>;
};

export type CheckoutProductInput = {
  id: Scalars['ID']['input'];
};

export type InitiateCheckout = {
  __typename?: 'InitiateCheckout';
  paymentKey: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkout: InitiateCheckout;
};


export type MutationCheckoutArgs = {
  checkoutProducts: CheckoutInput;
};

export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  fetchOrder: StripeCheckoutSession;
  getProducts: Array<Product>;
};


export type QueryFetchOrderArgs = {
  paymentKey: Scalars['String']['input'];
};

export type StripeCheckoutSession = {
  __typename?: 'StripeCheckoutSession';
  id: Scalars['ID']['output'];
  lineItems: Array<StripeLineItem>;
  priceTotal: Scalars['Int']['output'];
};

export type StripeLineItem = {
  __typename?: 'StripeLineItem';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  priceUnit: Scalars['Int']['output'];
};

export type CheckoutMutationVariables = Exact<{
  checkoutProducts: CheckoutInput;
}>;


export type CheckoutMutation = { __typename?: 'Mutation', checkout: { __typename?: 'InitiateCheckout', paymentKey: string } };

export type FetchOrderQueryVariables = Exact<{
  paymentKey: Scalars['String']['input'];
}>;


export type FetchOrderQuery = { __typename?: 'Query', fetchOrder: { __typename?: 'StripeCheckoutSession', id: string, priceTotal: number, lineItems: Array<{ __typename?: 'StripeLineItem', id: string, name: string, priceUnit: number }> } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'Product', id: string, name: string, slug: string, description: string, price: number, imageUrl: string }> };


export const CheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Checkout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkoutProducts"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CheckoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checkoutProducts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkoutProducts"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentKey"}}]}}]}}]} as unknown as DocumentNode<CheckoutMutation, CheckoutMutationVariables>;
export const FetchOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paymentKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"priceTotal"}},{"kind":"Field","name":{"kind":"Name","value":"lineItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priceUnit"}}]}}]}}]}}]} as unknown as DocumentNode<FetchOrderQuery, FetchOrderQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;