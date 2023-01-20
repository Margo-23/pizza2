import React from 'react'
import { Link } from 'react-router-dom';
import emptyImg from '../../src/assets/img/empty-cart.png';


function CartEmpty() {
  return (
<div class="cart cart--empty">
    <h2>Корзина пустая <span>😕</span></h2>
    <p>Вероятней всего, вы не заказывали ещё пиццу.<br/>Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
    <img src={emptyImg} alt="Empty cart" />
        <Link to="/" class="button button--black" ><span>Вернуться назад</span></Link>
        </div>
  )
}

export default CartEmpty;