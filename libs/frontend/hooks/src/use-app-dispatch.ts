import { useDispatch } from 'react-redux';

import { AppDispatch } from '@fitfriends/store';

export const useAppDispatch = useDispatch<AppDispatch>;
