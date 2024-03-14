(async (window, d, undefined) => {
    const _ = (selector, contex=d) => contex.querySelector(selector);

    let startTime;
    function timerStart() { startTime = new Date(); }
    function elapsedTime() { if (!startTime) return 0; return (new Date() - startTime) / 1000; }

    function seed () { return Math.floor(Math.random() * 9999999999); }

    function toggleDisplay(el, value=null) {
        if (value !== null) {
            el.style.display = (value === true) ? '' : 'none';
            return;
        }

        el.style.display = (el.style.display === 'none') ? '' : 'none';
    }

    // Seeded random number generator
    function seededRandom(a) {
        return function() {
          a |= 0; a = a + 0x9e3779b9 | 0;
          var t = a ^ a >>> 16; t = Math.imul(t, 0x21f0aaad);
              t = t ^ t >>> 15; t = Math.imul(t, 0x735a2d97);
          return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
        }
    }

    // UUID generator
    function uuidv4() { return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)); }

    // Preload all API workflows
    async function load_api_workflows() {
        let wf = {
            'basic_portrait': '/dungeon/js/basic_portrait.json',
            'basic_portrait_lcm': '/dungeon/js/basic_portrait_lcm.json',
        }

        for (let key in wf) {
            let response = await fetch(wf[key]);
            wf[key] = await response.json();
        }

        return wf;
    }
    const workflows = await load_api_workflows();

    // Get the the installed Checkpoints    
    async function get_checkpoints() {
        let response = await fetch('object_info/CheckpointLoaderSimple', {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        let checkpoints = response['CheckpointLoaderSimple']['input']['required']['ckpt_name'][0];
        const checkpoints_regex = {
            'DreamShaperXLTurboV2': /.*dreamshaper.*xl.*turbo.*v2.*\.safetensors$/gi,
            'ProteusV0.3': /.*proteus.*0\.3.*\.safetensors$/gi,
        };
        let available_checkpoints = {};
    
        for (let key in checkpoints_regex) {
            available_checkpoints[key] = '';

            checkpoints.forEach(ckpt => {
                if (checkpoints_regex[key].test(ckpt)) {
                    available_checkpoints[key] = ckpt;
                }
            });
        }

        return available_checkpoints;
    };
    const available_checkpoints = await get_checkpoints();

    const positive_template = "{{SETTING}} {{STYLE}} closeup of a {{AGE}} {{BODY}}{{ETHNICITY}}{{RACE}} {{GENDER}} {{CLASS}}{{HAIR_COLOR}}{{HAIRSTYLE}}{{GEAR}}.{{RACE_HELPER}}{{BACKGROUND}} High quality, detailed, high resolution{{SETTING_HELPER}}.{{MOOD}}{{ATMOSPHERE}}";
    const negative_template = "{{STYLE}}{{RACE}}rendering, blurry, noisy, deformed, text, {{GENDER}}scars, blood, dirty, nipples, naked, boobs, cleavage, face mask, Christmas, garden, zippers, ill, lazy eye, {{BACKGROUND}} author, signature, 3d";

    const ethnicities = {
        "1": ["Eritrean", "Djiboutian", "Ethiopian", "Somali", "Kenyan", "Ugandan", "Rwandan", "Burundian", "Tanzanian", "Malagasy", "Mauritian", "Seychellois"],
        "2": ["Chadian", "Sudanese", "Central African", "Cameroonian", "Gabonese", "Equatorial Guinean", "Sao Tomean", "Angolan", "Congolese", "Zambian", "Malawian", "Mozambican", "Madagascan", "Comorian", "Mauritian", "Seychellois"],
        "3": ["Egyptian", "Libyan", "Tunisian", "Algerian", "Moroccan", "Mauritanian", "Sahrawi", "Tuareg"],
        "4": ["Namibian", "South African", "Botswanan", "Zimbabwean", "Zambian", "Malawian", "Mozambican", "Swazi", "Lesotho", "Basotho"],
        "5": ["Mauritanian", "Senegalese", "Malian", "Nigerien", "Burkinabe", "Ivorian", "Ghanaian", "Togolese", "Beninese", "Nigerian", "Cameroonian", "Equatorial Guinean", "Sao Tomean", "Gabonese", "Congolese"],

        "6": ["Belizean", "Costa Rican", "Salvadoran", "Guatemalan", "Honduran", "Nicaraguan", "Panamanian"],
        "7": ["Antiguan", "Bahamian", "Barbadian", "Cuban", "Dominican", "Dominican", "Grenadian", "Haitian", "Jamaican", "Kittian and Nevisian", "Lucian", "Vincentian", "Trinidadian and Tobagonian"],
        "8": ["Argentine", "Bolivian", "Brazilian", "Chilean", "Colombian", "Ecuadorian", "Guyanese", "Paraguayan", "Peruvian", "Surinamese", "Uruguayan", "Venezuelan"],

        "9": ["Kazakhstani", "Kyrgyzstani", "Tajikistani", "Turkmen", "Uzbekistani"],
        "10": ["Chinese", "Japanese", "Korean", "Mongolian", "Taiwanese"],
        "11": ["Bangladeshi", "Bhutanese", "Indian", "Maldivian", "Nepalese", "Pakistani", "Sri Lankan"],
        "12": ["Burmese", "Cambodian", "Filipino", "Indonesian", "Laotian", "Malaysian", "Singaporean", "Thai", "Timorese", "Vietnamese"],
        "13": ["Afghan", "Armenian", "Azerbaijani", "Bahraini", "Cypriot", "Georgian", "Iranian", "Iraqi", "Israeli", "Jordanian", "Kuwaiti", "Lebanese", "Omani", "Palestinian", "Qatari", "Saudi", "Syrian", "Turkish", "Emirati", "Yemeni"],

        "14": ["Australian", "Fijian", "I-Kiribati", "Marshallese", "Micronesian", "Nauruan", "New Zealander", "Palauan", "Papua New Guinean", "Samoan", "Solomon Islander", "Tongan", "Tuvaluan", "Vanuatuan"],

        "15": ["Belarusian", "Bulgarian", "Czech", "Hungarian", "Polish", "Moldovan", "Romanian", "Russian", "Slovak", "Ukrainian"],
        "16": ["Estonian", "Latvian", "Lithuanian"],
        "17": ["Albanian", "Bosnian", "Croatian", "Greek", "Italian", "Maltese", "Montenegrin", "North Macedonian", "Portuguese", "Serbian", "Slovenian", "Spanish"],
        "18": ["Austrian", "Belgian", "Dutch", "French", "German", "Liechtensteiner", "Luxembourger", "Monacan", "Swiss"],
        "19": ["Icelandic", "Irish", "Manx", "British"],

        //"20": ["Cuban", "Dominican", "Haitian", "Jamaican", "Puerto Rican", "Trinidadian"],
        "21": ["Fijian", "Papua New Guinean", "Solomon Islander", "Vanuatuan", "Kiribati", "Marshallese", "Micronesian", "Nauruan", "Palauan", "Samoan", "Tongan", "Tuvaluan"],
    }

    // Queue a prompt
    async function queue_prompt(prompt = {}) {
        const data = { 'prompt': prompt, 'client_id': client_id };

        const response = await fetch('/prompt', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    // Interrupt the generation
    async function interrupt() {
        const response = await fetch('/interrupt', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'text/html'
            },
        });

        //return await response.json();
    }

    const client_id = uuidv4();
    const server_address = window.location.hostname + ':' + window.location.port;

    // Current status
    let IS_GENERATING = false;

    // HTML elements
    const roll = _('#roll');
    const roll_icon = _('#roll-icon');
    const progressbar = _('#main-progress');
    const seed_input = _('#main-seed');
    const is_random_input = _('#is-random');
    const spinner = _('#main-spinner');
    const modal = _('#app-modal');
    const results = _('#results');

    const quality_input = _('#quality-input');
    const batch_size_input = _('#batch-size-input');
    const style_input = _('#style-input');
    const setting_input = _('#setting-input');
    const body_structure_input = _('#body-structure-input');
    const race_input = _('#race-input');
    const age_input = _('#age-input');
    const gender_input = _('#gender-input');
    const class_input = _('#class-input');
    const gear_input = _('#gear-input');
    const hairstyle_input = _('#hairstyle-input');
    const haircolor_input = _('#haircolor-input');
    const background_input = _('#background-input');
    const mood_input = _('#mood-input');
    const atmosphere_input = _('#atmosphere-input');
    const ethnicity_input = _('#ethnicity-input');
    const custom_input = _('#custom-input');
    
    function updateProgress(max=0, value=0) { progressbar.max = max; progressbar.value = value; }

    // Event listeners
    roll.addEventListener('click', async (event) => {
        if (IS_GENERATING) {
            await interrupt();
        } else {      
            let wf = structuredClone(workflows['basic_portrait']);
            let base_steps = 14;        // minimum number of steps
            let step_increment = 14;    // number of steps multiplied by the quality factor
            let sampler_name = 'dpmpp_2m';
            let scheduler = 'exponential';
            let CFG = 6.5;

            let model = style_input.options[style_input.selectedIndex].value;
            let positive = positive_template;
            let negative = negative_template;
            let setting = setting_input.options[setting_input.selectedIndex].value;
            let body_structure = body_structure_input.value;
            let race = race_input.options[race_input.selectedIndex].value;
            let race_helper = '';
            let negative_race = '';
            let age = age_input.value;
            let gender = gender_input.value;
            let negative_gender = '';
            let dndclass = class_input.options[class_input.selectedIndex].value;
            let gear = gear_input.options[gear_input.selectedIndex].value;
            let haircolor = haircolor_input.options[haircolor_input.selectedIndex].value;
            let hairstyle = hairstyle_input.options[hairstyle_input.selectedIndex].value;
            let background = background_input.options[background_input.selectedIndex].value;
            let mood = mood_input.options[mood_input.selectedIndex].value;
            let atmosphere = atmosphere_input.options[atmosphere_input.selectedIndex].value;
            let ethnicity_id = ethnicity_input.options[ethnicity_input.selectedIndex].value;
            let custom_prompt = custom_input.value;
            let ethnic_bias = '';
            let negative_background = '';
            let style = '';
            let nagative_style = '';
            let is_cinematic = false;

            // seed number
            let rndseed = seed_input.value
            if ( is_random_input.checked ) {
                rndseed = seed();
                seed_input.value = rndseed;
            }
            let localrand = seededRandom(rndseed);

            // Style
            if ( model.includes('-Cinematic') ) {
                style = 'film still cinematic photo'
                nagative_style = 'illustration, anime, cosplay, ';
                is_cinematic = true;
            } else if ( model.includes('-Anime') ) {
                style = 'anime illustration'
                nagative_style = 'photo, fanart, ';
            } else {
                style = 'illustration digital painting'
                nagative_style = 'photo, anime, ';
            }
            positive = positive.replace('{{STYLE}}', style);
            negative = negative.replace('{{STYLE}}', nagative_style);

            // Setting
            if ( setting === 'fantasy' ) {
                positive = positive.replace('{{SETTING}}', 'fantasy');
                if ( is_cinematic ) {
                    positive = positive.replace('{{SETTING_HELPER}}', ', (D&D:1.1), Lord of the rings');
                } else {
                    positive = positive.replace('{{SETTING_HELPER}}', ', (D&D:1.1), (Lord of the rings:0.8)');
                }
            }

            // Body structure
            if ( body_structure == '0' ) {
                body_structure = 'slender ';
            } else if ( body_structure == '1' ) {
                body_structure = '';
                if ( race === 'halfling' || race === 'gnome' || race === 'dwarf' ) { body_structure = 'stocky '; }
            } else if ( body_structure == '2' ) {
                if ( gender == '0' || gender == '1' ) { body_structure = 'strong muscular '; }
                else { body_structure = 'strong ';}
                if ( race === 'halfling' || race === 'gnome' || race === 'dwarf' ) { body_structure = 'stocky ' + body_structure; }
            } else if ( body_structure == '3' ) {
                body_structure = 'chubby ';
                if ( race === 'halfling' || race === 'gnome' || race === 'dwarf' ) { body_structure = 'stocky ' + body_structure; }
            }
            positive = positive.replace('{{BODY}}', body_structure);

            // Race
            if ( race === 'human') { negative_race = '(elf, long pointy ears:1.2), ' }
            else if ( race === 'half-elf' || race === 'halfling' ) { race_helper = ' pointy ears.'; }
            else if ( race === 'elven' ) {
                // have to use Elven instead of Elf to avoid Christmas contamination
                negative_race = 'green, beard, ';
            }
            positive = positive.replace('{{RACE}}', race);
            positive = positive.replace('{{RACE_HELPER}}', race_helper);
            negative = negative.replace('{{RACE}}', negative_race);

            // Age
            if ( age == '0' ) { age = 'young'; }
            else if ( age == '1' ) { age = '30yo'; }
            else if ( age == '2' ) { age = '45yo'; }
            else if ( age == '3' ) { age = '60yo'; }
            positive = positive.replace('{{AGE}}', age);

            // Gender
            if ( gender == '0') { gender = 'female'; negative_gender = 'horror, ' }
            else if ( gender == '1' ) { gender = '(masculine:1.1) female'; if ( race !== 'elven' ) { negative_gender = 'beard, '}}
            else if ( gender == '2' ) { gender = '(queer:0.9) feminine male'; negative_gender = 'zombie, beard, ' }
            else if ( gender == '3' ) { gender = 'male' }
            positive = positive.replace('{{GENDER}}', gender);
            negative = negative.replace('{{GENDER}}', negative_gender);

            // Class
            positive = positive.replace('{{CLASS}}', dndclass);

            // Gear
            if ( gear !== '' ) {
                gear = ' wearing ' + gear;
            }
            positive = positive.replace('{{GEAR}}', gear);

            // Hair color and hairstyle
            if ( hairstyle === 'bald' ) {
                haircolor = '';
            }

            if ( hairstyle === 'simple braid hairstyle' ) {
                if ( gender.includes('female') ) {
                    hairstyle = '(simple braid hairstyle:0.7)';
                } else {
                    hairstyle = 'simple braid hairstyle';
                }
            }

            if ( haircolor !== '' ) {
                if ( hairstyle.includes('{{COLOR}}') ) {
                    haircolor = ' with ' + hairstyle.replace('{{COLOR}}', haircolor + ' ');
                    hairstyle = '';
                } else {
                    haircolor = ' with ' + haircolor + ' hair';
                }
            }
            positive = positive.replace('{{HAIR_COLOR}}', haircolor);

            hairstyle = hairstyle.replace('{{COLOR}}', '');
            if ( hairstyle !== '' ) {
                if ( haircolor !== '' ) {
                    hairstyle = ' and ' + hairstyle;
                } else {
                    hairstyle = ' with ' + hairstyle;
                }
            }
            positive = positive.replace('{{HAIRSTYLE}}', hairstyle);

            // Background
            if ( background !== '' ) {
                background = ' ' + background + '.'
                negative_background = 'flat background, ';
            }
            positive = positive.replace('{{BACKGROUND}}', background);
            negative = negative.replace('{{BACKGROUND}}', negative_background);

            // select checkpoint and main workflow
            let is_LCM = (model.includes('-LCM')) ? true : false;
            let is_Turbo = (model.includes('Turbo')) ? true : false;
            model = model.replace('-LCM', '');
            model = model.replace('-Anime', '');
            model = model.replace('-Cinematic', '');
            // lower the number of steps for LCM and Turbo models
            if ( is_LCM || is_Turbo ) {
                base_steps = 4;
                step_increment = 4;
            }
            if ( is_LCM ) {
                wf = structuredClone(workflows['basic_portrait_lcm']);
                CFG = 2.5;
                sampler_name = 'lcm';
                scheduler = 'normal';
            }
            if ( is_Turbo ) {
                CFG = 2;
            }

            // Atmospere and mood
            if ( mood !== '' ) {
                mood = ' ' + mood;
                atmosphere = ', ' + atmosphere;
            }
            positive = positive.replace('{{MOOD}}', mood);
            positive = positive.replace('{{ATMOSPHERE}}', atmosphere);

            // Ethnicity
            if ( ethnicity_id !== '' ) {
                let ethnic1, ethnic2, mainArea1, mainArea2;

                if ( ethnicity_id === '0' ) {
                    let keys = Object.keys(ethnicities);
                    mainArea1 = ethnicities[keys[Math.floor(localrand() * keys.length)]];
                    mainArea2 = ethnicities[keys[Math.floor(localrand() * keys.length)]];
                } else {
                    mainArea1 = ethnicities[ethnicity_id];
                    mainArea2 = ethnicities[ethnicity_id];
                }

                ethnic1 = mainArea1[Math.floor(localrand()*mainArea1.length)];
                ethnic2 = mainArea2[Math.floor(localrand()*mainArea2.length)];

                while ( ethnic1 === ethnic2 ) {
                    ethnic2 = mainArea2[Math.floor(localrand()*mainArea2.length)];
                }

                console.log('Ethnicity: ' + ethnic1 + ', ' + ethnic2);
                ethnic_bias = '(' + ethnic1 + ', ' + ethnic2 + ':0.7) ';
            }
            positive = positive.replace('{{ETHNICITY}}', ethnic_bias);

            // model specific settings
            if ( model === 'DreamShaperXLTurboV2' ) {
                sampler_name = 'dpmpp_sde';

                // Activate CFGRescale for DreamShaperXLTurboV2 that really doesn't want to listen otherwise
                wf['14'] = {
                    "inputs": {
                      "multiplier": 0.7,
                      "model": [
                        "1",
                        0
                      ]
                    },
                    "class_type": "RescaleCFG",
                    "_meta": {
                      "title": "RescaleCFG"
                    }
                  };
                wf['7']['inputs']['model'] = ["14", 0];
                CFG = 4;
                base_steps = 6;
                scheduler = 'karras';
            }

            // custom input
            if ( custom_prompt !== '' ) {
                wf["20"] = {
                    "inputs": {
                      "width": 1024,
                      "height": 1024,
                      "size_cond_factor": 4,
                      "text": custom_prompt.replace(/(\r\n|\n|\r)/gm, " "),
                      "clip": [
                        "1",
                        1
                      ]
                    },
                    "class_type": "CLIPTextEncodeSDXL+",
                    "_meta": {
                      "title": "🔧 SDXLCLIPTextEncode"
                    }
                  };
                wf["21"] = {
                    "inputs": {
                      "conditioning_to": [
                        "20",
                        0
                      ],
                      "conditioning_from": [
                        "4",
                        0
                      ]
                    },
                    "class_type": "ConditioningConcat",
                    "_meta": {
                      "title": "Conditioning (Concat)"
                    }
                  };
                  wf['7']['inputs']['positive'] = ["21", 0];
            }

            // update the workflow with the selected parameters
            wf['1']['inputs']['ckpt_name'] = available_checkpoints[model];
            wf['7']['inputs']["sampler_name"] = sampler_name;
            wf['7']['inputs']["scheduler"] = scheduler;    
            wf['7']['inputs']['seed'] = rndseed;
            wf['7']['inputs']['steps'] = base_steps + Math.round(quality_input.value * step_increment);
            wf['7']['inputs']['cfg'] = CFG;
            wf['6']['inputs']['batch_size'] = batch_size_input.value;
            wf['4']['inputs']['text'] = positive;
            wf['5']['inputs']['text'] = negative;

            timerStart();
            response = await queue_prompt(wf);
            wf = null;

            if ('error' in response) {
                IS_GENERATING = false;
                toggleDisplay(spinner, IS_GENERATING)
                toggleDisplay(roll_icon, !IS_GENERATING)
                updateProgress();
                _('#modal-message').innerHTML = response['error']['message'];
                UIkit.modal(modal).show();
                console.log('Error: ' + response['error']['message']);
            }
        }
    });

    is_random_input.addEventListener('change', (event) => {
        if (is_random_input.checked) {
            seed_input.disabled = true;
        } else {
            seed_input.disabled = false;
        }
    });

    // WebSocket
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(protocol + '//' + server_address + '/ws?clientId=' + client_id);
    socket.addEventListener('open', (event) => {
        console.log('Connected to the server');
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        
        if ( data.type === 'progress' ) {
            //IS_GENERATING = true;
            updateProgress(data['data']['max'], data['data']['value']);
        } else if (data.type === 'executed') {
            const execution_time = elapsedTime();
            console.log('Execution time: ' + execution_time + 's');
            if ('images' in data['data']['output']) {
                results.innerHTML = '';
                const images = data['data']['output']['images'];
                const grid = ( images.length > 1 ) ? ' class="uk-width-1-2"' : '';
                for (let i = 0; i < images.length; i++) {
                    const filename = images[i]['filename']
                    const subfolder = images[i]['subfolder']
                    const rand = Math.random();
                    results.innerHTML += '<div' + grid + '><div><a href="/view?filename=' + filename + '&type=output&subfolder=' + subfolder + '&rand=' + rand + '" data-type="image"><img src="/view?filename=' + filename + '&type=output&subfolder=' + subfolder + '&rand=' + rand + '" width="1024" height="1024" alt=""></a></div></div>';
                }
            }
        } else if (data.type === 'execution_interrupted') {
            console.log('Execution Interrupted');
        } else if (data.type === 'status') {
            IS_GENERATING = (data['data']['status']['exec_info']['queue_remaining'] > 0) ? true : false;

            toggleDisplay(spinner, IS_GENERATING)
            toggleDisplay(roll_icon, !IS_GENERATING)
            updateProgress();
        }
    });

})(window, document, undefined);

