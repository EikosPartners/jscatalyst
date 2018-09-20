<template>
    <div>
        <v-menu offset-y open-on-hover>
            <v-btn flat slot="activator" class="navBtn">Themes
                <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile v-for="item in themes" :key="item.name" @click="changeTheme(item.name, item.themeColors, item.isCustom)">
                <v-list-tile-title class="theme-item" :class="{ selected: item.name.toLowerCase() === colorTheme}" >{{ item.name | dropCap }}</v-list-tile-title>
                    <v-icon :color="getColorForItem(item)" :style="{color: getColorForItem(item)}">brightness_1</v-icon>
                </v-list-tile>
                    <v-list-tile v-if="allowCustom" @click="addColor()">
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
    import {mapState} from 'vuex'

    /** ThemeChooserComponent
     * 
     * @example 
     * <theme-chooser></theme-chooser>
     */
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
            ...mapState({
                allowCustom: state => state.themeMod.customEnabled,
            }),
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
        filters: {
            dropCap(item){
                return item.slice(0, 1).toUpperCase() + item.slice(1)
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
                    let themes = this.$store.getters.customThemes;
                    isCustom = false;

                    themes.some( (theme) => {
                        if (theme.name === newTheme) { 
                            return isCustom = true;
                        }
                    })
                    
                }

                this.$emit('jsc_theme_change', {
                    name: newTheme,
                    themeColors,
                    isCustom
                });
            },
           
            getColorForItem (item) {
                return this.themes.filter(theme=>{
                    return theme.name === item.name
                })[0].themeColors.fifth
                
            },
            saveTheme() {
                // Filter the theme name for any special characters or spaces.
                this.newThemeName = this.newThemeName.replace(/[^a-zA-Z ]/g, "")
                this.newThemeName = this.newThemeName.replace(/\s+/g, '-');
                this.newThemeName = this.newThemeName.toLowerCase()
                let payload = {
                    themeColors: {
                        first: this.newPrimaryColor.hex,
                        second: this.newAccentColor.hex,
                        third: this.newPrimaryColor.hex,
                        fourth: this.newAccentColor.hex,
                        fifth: this.newPrimaryColor.hex,
                        sixth: this.newAccentColor.hex,
                        seventh: this.newPrimaryColor.hex,
                        eighth: this.newAccentColor.hex,
                        vuetifyLight: this.newPrimaryColor.hex,
                        vuetifyDark: this.newAccentColor.hex
                    },
                    name: this.newThemeName,
                    isCustom: true
                };
                this.$store.commit("saveCustomTheme", payload)
                this.changeTheme(payload.name, payload.themeColors, true);


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

  .theme-item:before {
      display: inline-block;
      content: '';
      height: 0.75rem;
      width: 0.75rem;
      margin-right: 5px;
  }

  .theme-item.selected:before {
      border-radius: 1em;
      background-color: red;
  }
</style>