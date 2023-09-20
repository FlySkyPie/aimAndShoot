import clsx from "clsx";

import styles from "./styles.module.scss";

type IProps = {
  onHover: (name: string) => void;
};

export const Keyboard: React.FC<IProps> = ({ onHover }) => {
  return (
    <div className={styles["keyboard-base"]}>
      <div className={styles.key}>~</div>
      <div className={styles.key}>1</div>
      <div className={styles.key}>2</div>
      <div className={styles.key}>3</div>
      <div className={styles.key}>4</div>
      <div className={styles.key}>5</div>
      <div className={styles.key}>6</div>
      <div className={styles.key}>7</div>
      <div className={styles.key}>8</div>
      <div className={styles.key}>9</div>
      <div className={styles.key}>0</div>
      <div className={styles.key}>-</div>
      <div className={styles.key}>+</div>
      <div className={clsx(styles.key, styles.delete)}>Delete</div>
      <div className={clsx(styles.key, styles.tab)}>Tab</div>
      <div className={styles.key}>Q</div>
      <div
        className={clsx(styles.key, styles.active)}
        onMouseOver={() => onHover("W")}
      >
        w
      </div>
      <div className={styles.key}>E</div>
      <div className={styles.key}>R</div>
      <div className={styles.key}>T</div>
      <div className={styles.key}>Y</div>
      <div className={styles.key}>U</div>
      <div className={styles.key}>I</div>
      <div className={styles.key}>O</div>
      <div className={styles.key}>P</div>
      <div className={styles.key}>[</div>
      <div className={styles.key}>]</div>
      <div className={clsx(styles.key, styles.backslash)}>\</div>
      <div className={clsx(styles.key, styles.capslock)}>CapsLock</div>
      <div
        className={clsx(styles.key, styles.active)}
        onMouseOver={() => onHover("A")}
      >
        A
      </div>
      <div
        className={clsx(styles.key, styles.active)}
        onMouseOver={() => onHover("S")}
      >
        S
      </div>
      <div
        className={clsx(styles.key, styles.active)}
        onMouseOver={() => onHover("D")}
      >
        D
      </div>
      <div className={styles.key}>F</div>
      <div className={styles.key}>G</div>
      <div className={styles.key}>H</div>
      <div className={styles.key}>J</div>
      <div className={styles.key}>K</div>
      <div className={styles.key}>L</div>
      <div className={styles.key}>;</div>
      <div className={styles.key}>'</div>
      <div className={clsx(styles.key, styles.return)}>Return</div>
      <div className={clsx(styles.key, styles.leftshift)}>Shift</div>
      <div className={styles.key}>Z</div>
      <div className={styles.key}>X</div>
      <div className={styles.key}>C</div>
      <div className={styles.key}>V</div>
      <div className={styles.key}>B</div>
      <div className={styles.key}>N</div>
      <div className={styles.key}>M</div>
      <div className={styles.key}>,</div>
      <div className={styles.key}>.</div>
      <div className={styles.key}>/</div>
      <div className={clsx(styles.key, styles.rightshift)}>Shift</div>
      <div className={clsx(styles.key, styles.leftctrl)}>Ctrl</div>
      <div className={styles.key}>Alt</div>
      <div className={clsx(styles.key, styles.command)}>Command</div>
      <div className={clsx(styles.key, styles.space)}>Space</div>
      <div className={clsx(styles.key, styles.command)}>command</div>
      <div className={styles.key}>Alt</div>
      <div className={styles.key}>Ctrl</div>
      <div className={styles.key}>Fn</div>
    </div>
  );
};
