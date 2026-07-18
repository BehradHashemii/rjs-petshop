import styles from "./Cart.module.css";

function Cart({ title, icon }) {
  return (
    <div className={`${styles.Cart} glassBG`}>
      <div className={styles.icon}>{icon}</div>

      <h2>{title}</h2>
    </div>
  );
}

export default Cart;
