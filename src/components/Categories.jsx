import React from "react";

function Categories({value, changeCategory}) {
    const categoriesList = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
   
    return (
        <div className="categories">
            <ul>
                <li className={value == undefined ? 'active' : ''} onClick={() => { changeCategory(undefined); }}>Все</li>
                {categoriesList.map((item, index) => (
                    <li key={index} className={index === value ? 'active' : ''} onClick={() => { changeCategory(index); }}>{item}</li>
                ))}
            </ul>
        </div>

    );
}

export default Categories;