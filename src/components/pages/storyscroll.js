import React from 'react';

const AmpStory = () => {
    return (
        <amp-story
            standalone
            publisher="Your Website"
            publisher-logo-src="https://example.com/logo.png"
            poster-portrait-src="https://example.com/poster.jpg"
        >
            <amp-story-page id="tip-1:-drink-water-1" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src="https://www.medicoverhospitals.in/webstory/images/img2.webp"
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Drink Water"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical">
                    <h1 className="story-title">Tip 1: Drink Water</h1>
                    <p>Stay hydrated to maintain your body's balance and function.</p>
                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-page id="tip-2:-exercise-regularly-2" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src="https://www.medicoverhospitals.in/webstory/images/img3.webp"
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Exercise Regularly"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical">
                    <h1 className="story-title">Tip 2: Exercise Regularly</h1>
                    <p>Exercise is crucial for maintaining physical and mental health.</p>
                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-page id="tip-3:-sleep-well-3" auto-advance-after="5s">
                <amp-story-grid-layer template="fill">
                    <amp-img
                        src="https://www.medicoverhospitals.in/webstory/images/img1.jpg"
                        width="720"
                        height="1280"
                        layout="responsive"
                        alt="Sleep Well"
                    />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical" style={{color:'white'}}>
                    <h1 className="story-title">Tip 3: Sleep Well</h1>
                    <p>Quality sleep improves brain performance, mood, and health.</p>
                </amp-story-grid-layer>
            </amp-story-page>

            <amp-story-bookend src="https://example.com/bookend.json" layout="nodisplay"></amp-story-bookend>
            <amp-story-share-menu></amp-story-share-menu>
        </amp-story>
    );
};

export default AmpStory;
