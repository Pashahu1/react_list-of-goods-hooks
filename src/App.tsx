import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './component/GoodList';
import cn from 'classnames';
import { IListOfGoodsHooks } from './types/IListOfGoodsHooks';

enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC<IListOfGoodsHooks> = () => {
  const [filteredGoods] = useState<string[]>(goodsFromServer);
  const [correctSortField, setCorrectSortField] = useState<string>('');
  const [correctReverse, setCorrectReverse] = useState<boolean>(false);

  const classAl = { 'is-light': correctSortField !== SortType.Alphabetically };
  const classLength = { 'is-light': correctSortField !== SortType.Length };

  function getPreparedGoods(goods: string[]) {
    const sortedGoods = [...goods];

    switch (correctSortField) {
      case SortType.Alphabetically:
        sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SortType.Length:
        sortedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        break;
    }

    if (correctReverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }

  const visibleGoods = getPreparedGoods(filteredGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-success', classAl)}
          onClick={() => {
            setCorrectSortField(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', classLength)}
          onClick={() => {
            setCorrectSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !correctReverse })}
          onClick={() => setCorrectReverse(!correctReverse)}
        >
          Reverse
        </button>

        {(correctSortField || correctReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setCorrectSortField('');
              setCorrectReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={visibleGoods} />
    </div>
  );
};
