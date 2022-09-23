class DrupalService {

    constructor() {
        this.simulated = !(typeof window.Drupal === 'object');
        this.drupal = (typeof window.Drupal === 'object') ? window.Drupal : { behaviors: {} };

        if (typeof window.drupalSettings === 'object') {
            this.drupalSettings = {...window.drupalSettings};
        } else {
            const element = document.querySelector('body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
            this.drupalSettings = (element !== null) ? JSON.parse(element.textContent) : {}
        }

        this.once = (typeof window.once === 'function') ?
            window.once :
            (id, selector, context) => {
                return context.querySelectorAll(selector);
            };
    }

    getSimulated() {
        return this.simulated;
    }

    getDrupal() {
        return this.drupal;
    }

    getDrupalSettings() {
        return this.drupalSettings;
    }

    getOnce() {
        return this.once;
    }


    /**
     * Config loaded from <script> tag in /public/index.html
     * You can update the config by un-comment this code and execute function e.g. in reducer.
     * Updated code must be copy & paste from dev-tools back to the /public/index.html.
     * Then comment in again ...
     * /
     updateJson() {
        const conf = {
            votejsr: {
                permissions: [
                    'vjsr show voting stats',
                    'vjsr show voting stats before voted',
                    'vjsr add own votes',
                    'vjsr edit own votes',
                    'vjsr remove own votes',
                ],
                votingTypes: {
                    quality: {
                        id: 'quality',
                        label: 'Qualität',
                        base_type: 'five_star',
                        question: 'Qualität des Artikels',
                        description: 'Qualität bezüglich der Richtigkeit und Belegtheit der Informationen',
                        color: '#696',
                        condensed_format: '%result/5',
                        result_format: 'Stars: %result/5.',
                        extra_class: 'my-quality',
                        value_definition: {
                            points_5: 5,
                            points_4: 4,
                            points_3: 3,
                            points_2: 2,
                            points_1: 1,
                        },
                        labels: {
                            points_5: '5',
                            points_4: '4',
                            points_3: '3',
                            points_2: '2',
                            points_1: '1',
                        },
                        rating_factor: 1,
                        icon_family: '',
                        icon: 'quality'
                    },
                    ratify: {
                        id: 'ratify',
                        label: 'Publish',
                        base_type: 'yes_no',
                        question: 'Soll der Artikel veröffentlicht werden?',
                        description: '',
                        color: '#669',
                        extra_class: 'my-ratify',
                        value_definition: {
                            points_1: 1,
                            points_0: 0,
                            points_n1: -1,
                        },
                        labels: {
                            points_1: 'Yes',
                            points_n1: 'No'
                        },
                        rating_factor: 2,
                        icon_family: '',
                        icon: 'helped'
                    },
                    understandable: {
                        id: 'understandable',
                        label: 'Verstehbarkeit',
                        base_type: 'buttons',
                        question: 'Ist der Artikel verständlich?',
                        description: '',
                        color: '#669',
                        extra_class: 'my-understandable',
                        value_definition: {
                            points_n2: -2,
                            points_n1: -1,
                            points_0: 0,
                            points_1: 1,
                            points_2: 2,
                        },
                        labels: {
                            points_n2: 'Nein',
                            points_n1: 'Eher nein',
                            points_0: 'Weiß nicht',
                            points_1: 'Eher ja',
                            points_2: 'Ja',
                        },
                        rating_factor: 2,
                        icon_family: '',
                        icon: 'understandable'
                    },
                    correct: {
                        id: 'correct',
                        label: 'Korrektheit',
                        base_type: 'yes_no',
                        question: 'Sind die Angaben korrekt?',
                        description: '',
                        color: '#696',
                        extra_class: 'my-correct',
                        value_definition: {
                            points_1: 1,
                            points_n1: -1,
                            points_0: 0
                        },
                        labels: {
                            points_1: 'Yes',
                            points_n1: 'No',
                            points_0: 'Abstain'
                        },
                        allow_abstention: true,
                        rating_factor: 1,
                        icon_family: '',
                        icon: 'correct'
                    },
                },
                config: {
                    entity_vote_map: {
                        node: {
                            article: ['quality', 'ratify'],
                            page: ['correct', 'understandable']
                        }
                    },
                    api: {
                        request_options: {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        },
                        results: '/vote/vote-results.json',
                        vote: '/vote/vote/{entity_type_id}/{entity_id}.json',
                    },
                    icons: {
                        default_sprite: '/svg/ico.svg'
                    },
                    button_types: {
                        default: 'btn btn-primary',
                        primary: 'btn btn-primary btn-sm',
                        secondary: 'btn btn-secondary btn-sm',
                        tertiary: 'btn btn-outline-primary btn-sm'
                    }
                }
            }
        };

        console.log("DON'T FORGET TO COMMENT IN THE updateJson() FUNCTION.")

        const url = conf.votejsr.config.api.results;
        fetch(url, conf.votejsr.config.api.request_options)
            .then(response => response.json())
            .then(data => {
                conf.votejsr.votings = data;
                const element = document.querySelector('body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
                element.textContent = JSON.stringify(conf);
            });
    }
     /*
     * END updateJson().
     */
}

const drupalService = new DrupalService();
if (typeof drupalService['updateJson'] === 'function') {
    drupalService.updateJson();
}

export const Drupal = drupalService.getDrupal();
export const drupalSettings = drupalService.getDrupalSettings();
export const once = drupalService.getOnce();
export const simulated = drupalService.getSimulated();