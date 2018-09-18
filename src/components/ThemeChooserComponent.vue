<template>
    <div>
        <v-menu offset-y open-on-hover>
            <v-btn flat slot="activator" class="navBtn">Themes
                <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile v-for="item in themes" :key="item" @click="changeTheme(item)">
                <v-list-tile-title>{{ item }}</v-list-tile-title>
                    <v-icon :color="getColorForItem(item)" :style="{color: getColorForItem(item)}">brightness_1</v-icon>
                </v-list-tile>
                <v-list-tile @click="addColor()">
                <v-list-tile-title>New</v-list-tile-title>
                <v-icon>add</v-icon>
                </v-list-tile>
            </v-list>
        </v-menu>

        <v-dialog v-model="showColorPicker" max-width="600">
            <v-card>
                <v-card-title class="headline text-leg-center text-md-center text-sm-center">
                    Choose New Theme Color
                </v-card-title>

                <v-card-text>
                    <v-layout row>
                        <v-text-field placeholder="Enter theme name..." v-model="newThemeName"></v-text-field>
                    </v-layout>
                    <v-layout row wrap class="picker-container">
                        <div>
                            Choose a primary color:
                            <color-picker v-model="newPrimaryColor"></color-picker>
                        </div>
                        <div>
                            Choose an accent color:
                            <color-picker v-model="newAccentColor"></color-picker>
                        </div>
                        
                    </v-layout>
                </v-card-text>

                <v-card-actions class="btns-box">
                    <v-btn color="success" @click="saveTheme(true)">Save</v-btn>
                    <v-btn color="error" @click="showColorPicker = !showColorPicker">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import styleTogglerMixin from '@/mixins/styleTogglerMixin.js'
    import { Chrome } from 'vue-color';

    /** ThemeChooserComponent
     * 
     * @param {Array} customThemes - an array of custom themes to populate the component with
     * 
     * @example 
     * <theme-chooser :customThemes="myCustomThemes"></theme-chooser>
     */
    export default {
        components: {
            'color-picker': Chrome
        },
        props: {
            /**
             * The custom themes should be sent as objects with the following
             * 
             * @typedef {Array} customThemes
             * @property {string} name - the name of the theme
             * @property {string} primary - the hex string for the primary color
             * @property {string} accent - the hex string for the accent color
             */
            customThemes: {
                type: Array,
                default: () => { return []; }
            }
        },
        mixins: [styleTogglerMixin],
        data () {
            return {
                showColorPicker: false,
                newPrimaryColor: {},
                newAccentColor: {},
                newThemeName: ""
            }
        },
        mounted() {
            if (this.$store.state.themeMod) this.chooseTheme(this.colorTheme);

            // Add the customThemes. 
            this.setCustomThemes();
        },
        computed: {
            colorTheme: function() {
                if(this.$store.state.themeMod) return this.$store.state.themeMod.colorTheme;
                return 'blue'
            },
            allThemes: function() {
                if (this.$store.state.themeMod) return this.$store.state.themeMod.allThemes;
                return ['Blue']
            },
            themes () {
                return this.allThemes;
            }
        },
        methods: {
            addColor () {
                this.showColorPicker = true;
            },
            changeTheme (newTheme, themeColors, isCustom) {
                this.chooseTheme(newTheme);
                
                // if isCustom is not supplied, check the store to see if its a custom theme or not
                if (isCustom === undefined) {
                     let theme = this.getCustomTheme(newTheme);

                     isCustom = theme.length > 0 ? true : false;
                }

                this.$emit('jsc_theme_change', {
                    name: newTheme,
                    colors: themeColors,
                    isCustom
                });
            },
            setCustomThemes () {
                if (this.customThemes.length > 0) {
                    let localThis = this;
                    this.customThemes.forEach( theme => {
                        // Filter the theme name for any special characters or spaces.
                        theme.name = theme.name.replace(/[^a-zA-Z ]/g, "")
                        theme.name = theme.name.replace(/\s+/g, '-');

                        let payload = { 
                            primary: theme.primary,
                            accent: theme.accent,
                            name: theme.name,
                            isCustom: true
                        };

                        localThis.$store.commit("saveCustomTheme", payload);

                        localThis.addStyleTag(theme);
                    });
                }
            },
            addStyleTag (theme) {
                let themeCSS = `
                    .${theme.name.toLowerCase()}-theme { 
                        --first: ${theme.primary};
                        --second: ${theme.accent};
                        --third: ${theme.primary};
                        --fourth: ${theme.accent};
                        --fifth: ${theme.primary};
                        --sixth: ${theme.accent};
                        --seventh: ${theme.primary};
                        --eighth: ${theme.accent};

                        --vuetify-light: ${theme.primary};
                        --vuetify-dark: ${theme.accent};
                    }
                `

                let style = document.createElement("style");
                style.type = "text/css";
                style.appendChild(document.createTextNode(themeCSS));
                document.head.appendChild(style);
            },
            getColorForItem (item) {
                let color = this.getCustomTheme(item);

                if (color && color.length > 0) {
                    return color[0].primary + " !important"
                } else {
                    return item.toLowerCase();
                }
            },
            saveTheme() {
                // Filter the theme name for any special characters or spaces.
                this.newThemeName = this.newThemeName.replace(/[^a-zA-Z ]/g, "")
                this.newThemeName = this.newThemeName.replace(/\s+/g, '-');

                let payload = {
                    primary: this.newPrimaryColor.hex,
                    accent: this.newAccentColor.hex,
                    name: this.newThemeName,
                    isCustom: true
                };

                this.$store.commit("saveCustomTheme", payload)

                this.addStyleTag(payload);

                let themeColors = [];
                for (let i = 0; i < 4; i++) {
                    themeColors.push(this.newPrimaryColor.hex);
                    themeColors.push(this.newAccentColor.hex);
                }

                this.changeTheme(this.newThemeName, themeColors);

                this.showColorPicker = false;
                this.newPrimaryColor = {};
                this.newAccentColor = {};
                this.newThemeName = "";
            }
        }
    }
</script>

<style>
  .picker-container { 
    justify-content: space-evenly;
  }

  .picker {
    flex-grow: 1;
    margin-left: 5%;
  }

  .btns-box {
    justify-content: flex-end;
    padding-right: 16px;
  }
</style>