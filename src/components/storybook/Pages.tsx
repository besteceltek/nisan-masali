import { invitation } from "@/config/invitation";
import { formatSchedule } from "@/lib/schedule";
import { Rule } from "./Ornaments";
import Image from "next/image";

export function InvitationPage() {
  const schedule = formatSchedule(invitation);
  const when = [schedule.date, schedule.time].filter(Boolean);
  const where = [invitation.venueName.trim(), invitation.venueAddress.trim()].filter(Boolean);

  return (
    <article className="sheet-copy invitation-copy">
      <h1 className="title">{invitation.sharing.title}</h1>
      <h2 className="subtitle">{invitation.sharing.description}</h2>
      <div className="families">
        <div className="family-names">
          <span>{invitation.family.brideMother}</span>
          <span className="ampersand">ve</span>
          <span>{invitation.family.brideFather}</span>
        </div>
        <Rule />
        <div className="family-names">
          <span>{invitation.family.groomMother}</span>
          <span className="ampersand">ve</span>
          <span>{invitation.family.groomFather}</span>
        </div>
      </div>
      <div className="information-area">
        <div className="location">
          <Image src="/images/location.png" width={18} height={18} alt="" />
          <a href={invitation.mapUrl}>
            <p className="where">
              {where.map((line) => (
                <span key={line}>
                  {line.split(/(88)/g).map((part, index) =>
                    part === "88" ? (
                      <span className="address-number" key={index}>{part}</span>
                    ) : part
                  )}
                </span>
              ))}
            </p>
          </a>
        </div>
        <div className="time">
          <Image src="/images/time.png" width={18} height={18} alt="" />
          <p className="when">
            {when.map((line) => (
              <span key={line}>
                {line.split(/(Aralık)/).map((part, index) =>
                  part === "Aralık" ? (
                    <span className="month" key={index}>{part}</span>
                  ) : part
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </article>
  );
}

export function PageBody({}: {
  onReplay?: () => void;
}) {
  return <InvitationPage />;
}
