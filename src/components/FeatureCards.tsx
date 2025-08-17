import PlanIcon from "@/icons/Calendar";
import DifferentiationIcon from "@/icons/Differentiation";
import FeedbackIcon from "@/icons/Feedback";

const features = [
    {
        title: "Planning, simplified",
        desc: "Structure objectives, timing, and resources in less time, directly from the materials you already use.",
        icon: PlanIcon,
    },
    {
        title: "Differentiation built in",
        desc: "Adjust lessons to match student levels, language needs, and accommodations, quickly and clearly.",
        icon: DifferentiationIcon,
    },
    {
        title: "Feedback, instantly",
        desc: "Upload student work or lesson materials to get clear, actionable feedback—based on established teaching practice, and always private to your device.",
        icon: FeedbackIcon,
    }
];

export default function FeatureCards() {
    return (
        <section id="features" className="container-page py-14 sm:py-16">
            <h2 className="h2 text-center">
                Only what you need to plan faster, adapt better, and stay in control.
            </h2>
            <p className="muted text-center mt-2">
                Just the pieces you need for today’s plan, and tomorrow’s improvement.
            </p>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
                {features.map(f => (
                    <article key={f.title} className="card p-6">
                        <div className="h-10 w-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                            {f.icon && <f.icon className="w-5 h-5 text-brand" />}
                        </div>
                        <h3 className="font-semibold text-lg mt-4">{f.title}</h3>
                        <p className="muted mt-2">{f.desc}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
