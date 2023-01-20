import React from "react";


function Categories({onChangeCategory, categoryId}) {
    const categoriesList = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
   
    return (
        <div className="categories">
            <ul>
                <li className={categoryId == undefined ? 'active' : ''} onClick={() => { onChangeCategory(undefined);  }}>Все</li>
                {categoriesList.map((item, index) => (
                    <li key={index} className={index == categoryId ? 'active' : ''} onClick={() => { onChangeCategory(index) }}>{item}</li>
                ))}
            </ul>
        </div>

    );
}

export default Categories;