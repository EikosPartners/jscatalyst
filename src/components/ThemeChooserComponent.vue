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
                    <v-layout row wrap>
                        <v-flex>
                            Choose a primary color:
                            <color-picker v-model="newPrimaryColor"></color-picker>
                        </v-flex>
                        <v-flex>
                            Choose an accent color:
                            <color-picker v-model="newAccentColor"></color-picker>
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="success" @click="saveTheme()">Save Theme</v-btn>
                    <v-btn color="error" @click="showColorPicker = !showColorPicker">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import styleTogglerMixin from '@/mixins/styleTogglerMixin.js'
    import { Chrome } from 'vue-color';

    export default {
        components: {
            'color-picker': Chrome
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
            changeTheme (newTheme, themeColors) {
                this.chooseTheme(newTheme);
                this.$emit('jsc_theme_change', {
                    name: newTheme,
                    colors: themeColors
                });
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

                let themeCSS = `
                    .${this.newThemeName.toLowerCase()}-theme { 
                        --first: ${this.newPrimaryColor.hex};
                        --second: ${this.newAccentColor.hex};
                        --third: ${this.newPrimaryColor.hex};
                        --fourth: ${this.newAccentColor.hex};
                        --fifth: ${this.newPrimaryColor.hex};
                        --sixth: ${this.newAccentColor.hex};
                        --seventh: ${this.newPrimaryColor.hex};
                        --eighth: ${this.newAccentColor.hex};

                        --vuetify-light: ${this.newPrimaryColor.hex};
                        --vuetify-dark: ${this.newAccentColor.hex};
                    }
                `

                let themeColors = [];
                for (let i = 0; i < 4; i++) {
                    themeColors.push(this.newPrimaryColor.hex);
                    themeColors.push(this.newAccentColor.hex);
                }

                let style = document.createElement("style");
                style.type = "text/css";
                style.appendChild(document.createTextNode(themeCSS));
                document.head.appendChild(style);

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
    display: flex;
  }

  .picker {
    flex-grow: 1;
    margin-left: 5%;
  }
</style>