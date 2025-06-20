import styles from "./styles.module.scss";
import { ReviewCard } from "./ReviewCard";
import { IReview } from "@/entities/review/reviewsApi";

export const ReviewsList = ({ reviews }: { reviews: IReview[] }) => {
  return (
    <div className={styles.list}>
      {reviews.map((reviews) => (
        <ReviewCard key={reviews.id} {...reviews} />
      ))}
    </div>
  );
};
