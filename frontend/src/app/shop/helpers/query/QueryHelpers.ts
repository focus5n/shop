import {createContext, Dispatch, SetStateAction, useEffect, useState} from 'react'
import {
  ID, QueryBasicResponseContextProps, QueryBasicResponseContextPropsSingle,
  QueryResponseContextProps,
  QueryResponseContextPropsSingle,
  QueryState
} from './QueryModels'
import qs from 'qs'

const createResponseContext = <T>(initialState: QueryResponseContextProps<T>) => {
  return createContext(initialState)
}

const createResponseContextSingle = <T>(initialState: QueryResponseContextPropsSingle<T>) => {
  return createContext(initialState)
}

const createBasicResponseContext = <T>(initialState: QueryBasicResponseContextProps<T>) => {
  return createContext(initialState)
}

const createBasicResponseContextSingle = <T>(initialState: QueryBasicResponseContextPropsSingle<T>) => {
  return createContext(initialState)
}

const isNotEmpty = (obj: unknown) => {
  return obj !== undefined && obj !== null && obj !== ''
}

const isNotEmptys = (obj: unknown, obj2: unknown) => {
  return (obj !== undefined && obj !== null && obj !== '') && (obj2 !== undefined && obj2 !== null && obj2 !=='')
}
const stringifyRequestQuery = (state: QueryState): string => {
  const pagination = qs.stringify(state, {filter: ['page', 'size', 'direction'], skipNulls: true})
  const category = qs.stringify(state, {filter: ['mainCategory', 'subCategory'], skipNulls: true})
  const order = qs.stringify(state, {filter: ['userId'], skipNulls: true})
  const id = qs.stringify(state, {filter: ['id'], skipNulls: true})
  const del = qs.stringify(state, {filter: ['delete'], skipNulls: true})
  const search = isNotEmpty(state.search)
    ? qs.stringify(state, {filter: ['search'], skipNulls: true})
    : ''

  return [pagination, category, search, del, id, order]
    .filter((f) => f)
    .join('&')
}

const parseRequestQuery = (query: string): QueryState => {
  const cache: unknown = qs.parse(query)
  return cache as QueryState
}

const calculatedGroupingIsDisabled = <T>(
  isLoading: boolean,
  data: Array<T> | undefined
): boolean => {
  if (isLoading) {
    return true
  }
  return !data || !data.length
}

const calculateIsAllDataSelected = <T>(
  data: Array<T> | undefined,
  selected: Array<ID>
): boolean => {
  if (!data) {
    return false
  }

  return data.length > 0 && data.length === selected.length
}

const groupingOnSelect = (
  id: ID,
  selected: Array<ID>,
  setSelected: Dispatch<SetStateAction<Array<ID>>>
) => {
  if (!id) {
    return
  }

  if (selected.includes(id)) {
    setSelected(selected.filter((itemId) => itemId !== id))
  } else {
    const updateSelected = [...selected]
    updateSelected.push(id)
    setSelected(updateSelected)
  }
}

const groupingOnSelectAll = <T>(
  isAllSelected: boolean,
  setSelected: Dispatch<SetStateAction<Array<ID>>>,
  data?: Array<T & {id?: ID}>
) => {
  if (isAllSelected) {
    setSelected([])
    return
  }
  if (!data || !data.length) {
    return
  }
  setSelected(data.filter((item) => item.id).map((item) => item.id))
}

const useDebounce = (value: string | undefined, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debounceValue
}

export {
  createResponseContext,
  createBasicResponseContextSingle,
  createBasicResponseContext,
  createResponseContextSingle,
  stringifyRequestQuery,
  parseRequestQuery,
  calculatedGroupingIsDisabled,
  calculateIsAllDataSelected,
  groupingOnSelect,
  groupingOnSelectAll,
  useDebounce,
  isNotEmpty,
  isNotEmptys
}
