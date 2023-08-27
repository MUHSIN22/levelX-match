import { useEffect } from 'react';
import useAppDispatch from '../useAppDispatch/useAppDispatch';
import useAppSelector from '../useAppSelector/useAppSelector';
import fetchActionsMap from './fetchActionMap';
import {
  IFilterFunction,
  IRootStateField
} from '../../types/features/root.types';

export default function useFetchAPI(
  sliceName: 'root',
  stateField: IRootStateField,
  endPoint: string,
  filterFunction: IFilterFunction
) {
  const dispatch = useAppDispatch();
  const stateData = useAppSelector((state) => state[sliceName]);

  const fetchAction = fetchActionsMap[sliceName];

  useEffect(() => {
    dispatch(fetchAction({ endPoint, stateField, filterFunction }));
  }, [dispatch, sliceName, endPoint, fetchAction, filterFunction]);

  return { ...stateData };
}
