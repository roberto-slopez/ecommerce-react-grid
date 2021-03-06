# Ecommerce React Grid

`EReactGrid.renderAt(node, data, settings);`

- node: Is the html node where the component is rendered
- data: Is data ¯\\_(ツ)_/¯
- groups: Is a group of *data* elements
- settings: 
```js
    var settings = {
        currency: '$',
        /**
         * @cfg {function} callback
         */
        getChecks: function(data) {
            console.log(data);
            return;
        },
        translation: {
            /**
             * @cfg {string} add translation to the button that gets all the checks
             */
            getchecks: 'Cotizar'
        },
        /**
         * @cfg {string} prefix url use for complete absolute file paths o relative paths, like 'https://site.com' o 'images/'
         */
        prefixUrl: 'img/',
        /**
         * @cfg {string} logo url or path
         */
        brandLogo: 'img/brandlogo.png',
        /**
         * @cfg {string} alt for img brand logo
         */
        brandAlt: 'brandlogo',
        /**
         * @cfg {string} brand color
         */
        brandColor: '#311B92'
    };

    EReactGrid.renderAt(document.getElementById('root'), data, groups, settings);
```
NOTE: Data structure
```js
    var data = [
        {
            unique: '506',
            text: 'deluvio',
            img: 'img-unsplash.jpg',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            tags: ['blue', 'red', 'white']
        }
    ];
```
