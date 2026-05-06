import styles from "./portfolio.module.css";
import { careerEvents } from "./careerEvents";

export default function CareerTimeline() {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineInner}>
        {/* タイムライン（縦線） */}
        <div className={styles.timelineLine} />

        {/* イベント */}
        <div className={styles.timelineItems}>
          {careerEvents.map((event, index) => (
            <div key={`${event.date}-${index}`} className={styles.timelineItem}>
              {/* 中央：アイコン */}
              <div className="flex-shrink-0">
                <div className={styles.timelineIcon}>{event.icon}</div>
              </div>

              {/* 右側：タイトルと説明 */}
              <div className={styles.timelineBody}>
                <p className={styles.timelineDate}>{event.date}</p>
                <h3 className={styles.timelineTitle}>{event.title}</h3>
                {event.description && (
                  <p className={styles.timelineDescription}>
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
