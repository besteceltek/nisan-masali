import { PageBody } from "./Pages";

export function PageSheet({
  side,
  onReplay,
}: {
  side: "left" | "right";
  onReplay?: () => void;
}) {
  return (
    <div className={`page-sheet side-${side}`}>
      <div className="page-inner">
        <PageBody onReplay={onReplay} />
      </div>
      <span className="gutter" aria-hidden="true" />
    </div>
  );
}
