import React from "react";

function Sort({sortId, changeSort}) {
    const [togglePopup, setTogglePopup] = React.useState(false);    
    const sortNames = ['популярности', 'цене', 'алфавиту'];
    const sortRef = React.useRef();

    function changeActiveSort(index) {
        changeSort(index);
        setTogglePopup(false);
    };
//если нужно навесить сабытие на весь body в целом то можно и в реакте использовать такой метод
    React.useEffect(()=>{
        const handleClickOutside = (e)=>{
            if(!e.composedPath().includes(sortRef.current)){
                setTogglePopup(false);                
            }
        };

        document.body.addEventListener('click', handleClickOutside);


        //это дейтсвие в юсЭффекте происходит если элемент будет удален со страницы (т.е мы перейдем например в корзину где элемента Сорт нет)
        return ()=>{
            document.body.removeEventListener('click', handleClickOutside);
           }
    },[])

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label" onClick={() => { setTogglePopup(!togglePopup) }}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span>{sortNames[sortId]}</span>
            </div>

            {
                togglePopup && <div className='sort__popup'>
                    <ul>
                        {sortNames.map((item, index) => (
                            <li key={index} className={sortId === index ? 'active' : ''} onClick={() => { changeActiveSort(index) }}>{item}</li>
                        ))}
                    </ul>
                </div>


            }

        </div>
    );
}


export default Sort;