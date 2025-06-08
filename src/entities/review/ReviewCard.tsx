import { IReview } from "@/entities/review/reviewsApi";
import parse from "html-react-parser";
import { Card } from "antd";

export const ReviewCard = ({ text }: IReview) => {
  return <Card hoverable>{parse(text)}</Card>;
};
