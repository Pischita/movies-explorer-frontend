import './AboutProject.css';

export default function AboutProject(){
    return(
        <section className="about-project" id="about">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__text-wrapper">
                <div className="about-project__column">
                    <h3 className="about-project__step-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__step-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__column">
                    <h3 className="about-project__step-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__step-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="about-project__progress">
                <div className="about-project__progress-step about-project__progress-first-step">1 неделя</div>
                <div className="about-project__progress-step about-project__progress-second-step">4 недели</div>    
            </div>
            <div className="about-project__progress">
                <div className="about-project__progress-step about-project__progress-first-step about-project__progress-step-description">Back-end</div>
                <div className="about-project__progress-step about-project__progress-second-step about-project__progress-step-description">Front-end</div>    
            </div>
        </section>
    );
}