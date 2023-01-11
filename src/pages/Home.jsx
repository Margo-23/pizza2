import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Sceleton from '../components/PizzaBlock/Sceleton';

function Home({searchValue}) {
    let [items, setItems] = React.useState([]);
    let [isLoading, setIsLoading] = React.useState(true);
    let [categoryId, setCategoryId] = React.useState(undefined);
    let [activeSort, setActiveSort] = React.useState(0);
    const sortValues = ['rating', 'price', 'name'];

    const itemsList = items.map((item) => (
        <PizzaBlock {...item} key={item.id} />
    ))


    const sceletonList = [...new Array(6)].map((i, index) => (
        <Sceleton key={index} />
    ));

    React.useEffect(() => {
        setIsLoading(true);
            axios.get(`https://62fb8191e4bcaf53518672e4.mockapi.io/api/items?sortBy=${sortValues[activeSort]}&order=${activeSort==0?'desc':'asc'}${categoryId!==undefined ? `&category=${categoryId}`:''}${searchValue !=''? `&name=${searchValue}`:''}`).then(res => {
                setItems(res.data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, activeSort, searchValue])
    // console.log(items);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} changeCategory={(id)=>setCategoryId(id)}/>
                <Sort value={activeSort} changeSort={(id)=>setActiveSort(id)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                { isLoading ? sceletonList : itemsList }


                {/* {items && items.map((item)=>(
            <PizzaBlock {...item} key={item.id}/>
          ))} */}
            </div>
        </div>

    );

}

export default Home