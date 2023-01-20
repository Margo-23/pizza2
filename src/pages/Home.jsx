import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock/index';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { SearchContext } from '../App';


import {changeCategoryId, changeSortId, changeCurrentPage, setFilters} from "../redux/slices/filterSlice";
import { fetchPizzaItems } from '../redux/slices/pizzaSlice';

function Home() {
    const {searchValue} = React.useContext(SearchContext);
    // let [items, setItems] = React.useState([]);
    const items = useSelector((state)=>state.pizza.items);
    const status = useSelector((state)=>state.pizza.status);
    // let [isLoading, setIsLoading] = React.useState(true);
    // let [currentPage, setCurrentPage] = React.useState(1);
    const dispatch = useDispatch();
    const sortValues = ['rating', 'price', 'name'];    
    const {categoryId, sortId, currentPage} =  useSelector((state) => state.filter);
    console.log(categoryId, sortId, currentPage);
    const navigate = useNavigate();
    const isSearchParams = React.useRef(false); //юзреф сохраняет свое состояние при ререндере, а обычная переменная каждый бы раз сбрасывалась к состоянию фолс
    const isMounted = React.useRef(false);

    //сортировка по страницам
    const onChangePage = (page)=>{
        dispatch(changeCurrentPage(page));
    }

    // сортировка категории
    // let [categoryId, setCategoryId] = React.useState(undefined); ---,без редакса
    // const categoryId = useSelector((state) => state.filter.categoryId);
    const onChangeCategory = (id)=>{
        dispatch(changeCategoryId(id))
    }

    // сортировка по параметрам
    // let [activeSort, setActiveSort] = React.useState(0);---,без редакса
    // const sortId = useSelector(state=>state.filter.sortId)
    const onChangeSortId = (id)=>{
        dispatch(changeSortId(id));
    }

    const itemsList = items.map((item) => (
        <PizzaBlock {...item} key={item.id} />
    ))


    const sceletonList = [...new Array(6)].map((i, index) => (
        <Sceleton key={index} />
    ));


    const fetchItems =  () => {
        // setIsLoading(true);
            // axios.get(`https://62fb8191e4bcaf53518672e4.mockapi.io/api/items?page=${currentPage}&limit=8&sortBy=${sortValues[sortId]}&order=${sortId==0?'desc':'asc'}${categoryId!==undefined ? `&category=${categoryId}`:''}${searchValue !=''? `&name=${searchValue}`:''}`).then(res => {
            //     setItems(res.data);
            //     setIsLoading(false);
            // });
        dispatch(fetchPizzaItems({currentPage, categoryId, sortId, searchValue, sortValues}));
        window.scrollTo(0, 0);
    };    

    
    React.useEffect(()=>{
        const paramsStr = window.location.search;
        if(paramsStr){
            const params = qs.parse(paramsStr.replace('?', ''));
            dispatch(setFilters({...params}));
            isSearchParams.current = true;
        }
        // console.log('юс поиск параметров урл строки')
    }, [])

    React.useEffect(()=>{
        if(!isSearchParams.current){
            fetchItems();            
        }
        isSearchParams.current=false;
        // console.log('юс с главным запросом')
    }, [categoryId, sortId, searchValue, currentPage]);
    
//для того чтоб параметры фильтрации запроса на бек отображались как урл в строке нужно использовать библиотеку qs
    React.useEffect(()=>{
        if(isMounted.current){
            const queryStr = qs.stringify({
                categoryId,
                sortId,
                currentPage
            })
            navigate(`?${queryStr}`);
        }
        isMounted.current = true;
        // console.log('юс вшивание в строку')

    }, [categoryId, sortId, currentPage])


    return (
        <div className="container">
            <div className="content__top">
                <Categories onChangeCategory={onChangeCategory} categoryId={categoryId}/>
                <Sort sortId={sortId} changeSort={onChangeSortId}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status == 'error'? (
                <h2>Ошибка загрузки <span>😕</span></h2>
            )
        :(
            <div className="content__items">
                { status == 'loading' ? sceletonList : itemsList }

            </div>
        )}


            <div>
                <Pagination setCurrentPage={onChangePage} />
            </div>
        </div>

    );

}

export default Home