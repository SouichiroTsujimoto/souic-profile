"use client";

import ThemeToggle from "@/app/components/ThemeToggle";
import { useTransitionRouter } from "@/app/hooks/useTransitionRouter";
import { XMarkIcon as XIcon } from "@heroicons/react/24/outline";
import styles from "../portfolio.module.css";
import { careerEvents } from "../careerEvents";

export default function CareerContent() {
  const router = useTransitionRouter();

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      router.push("/portfolio");
    }
  };

  return (
    <div
      className={`${styles.overlayContainer} cursor-pointer`}
      onClick={handleBackgroundClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          router.push("/portfolio");
        }
      }}
      tabIndex={-1}
    >
      <ThemeToggle />
      <div
        className={`${styles.overlayContent} cursor-default`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className={styles.overlayPanel}>
          <div className={styles.overlayBody}>
            <button
              type="button"
              className={styles.overlayCloseButton}
              onClick={() => router.push("/portfolio")}
              aria-label="閉じる"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h2 className={styles.overlayTitle}>キャリアタイムライン</h2>

            <div
              className={`${styles.timelineContainer} ${styles.timelineContainerLarge}`}
            >
              <div className={styles.timelineInner}>
                {/* タイムライン（縦線） */}
                <div className={styles.timelineLine} />

                {/* イベント */}
                <div className={styles.timelineItems}>
                  {careerEvents.map((event, index) => (
                    <div
                      key={`${event.date}-${index}`}
                      className={styles.timelineItem}
                    >
                      {/* アイコン */}
                      <div className="flex-shrink-0">
                        <div className={styles.timelineIcon}>{event.icon}</div>
                      </div>

                      {/* タイトルと説明 */}
                      <div className={styles.timelineBody}>
                        <p className={styles.timelineDate}>{event.date}</p>
                        {event.link ? (
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.timelineTitleLink}
                          >
                            <h3 className={styles.timelineTitle}>{event.title}</h3>
                          </a>
                        ) : (
                          <h3 className={styles.timelineTitle}>{event.title}</h3>
                        )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
