import { BookOpen, GraduationCap, Sparkles } from "lucide-react";
import styles from "./SchoolingHeroFrame.module.css";

export default function SchoolingHeroFrame() {
  return (
    <div className={styles.scene}>
      <div className={styles.shadow} aria-hidden />
      <div className={styles.frame}>
        <div className={styles.inner}>
          <div className={`${styles.corner} ${styles.cornerTl}`} aria-hidden />
          <div className={`${styles.corner} ${styles.cornerBr}`} aria-hidden />

          <span className={styles.badge}>
            <GraduationCap className="h-4 w-4" aria-hidden />
            SSL+++
          </span>

          <div className={styles.content}>
            <p className={styles.eyebrow}>Accompagnement</p>
            <p className={styles.title}>Scolaire</p>
            <p className={styles.subtitle}>6 – 18 ans</p>
          </div>

          <div className={styles.icons} aria-hidden>
            <span className={`${styles.icon} ${styles.iconA}`}>
              <BookOpen className="h-5 w-5" />
            </span>
            <span className={`${styles.icon} ${styles.iconB}`}>
              <Sparkles className="h-4 w-4" />
            </span>
          </div>

          <div className={styles.bars} aria-hidden>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
