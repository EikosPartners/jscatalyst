<template>
    <div>
        <v-menu offset-y open-on-hover>
            <v-btn flat slot="activator" class="navBtn">Themes
                <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile v-for="item in themes" :key="item.name" @click="changeTheme(item.name)">
                <v-list-tile-title>{{ item.name | dropCap }}</v-list-tile-title>
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
        import chroma from 'chroma-js';
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
                newPrimaryColor: {
                  hsl: { "h": 1.5788509971217104, "s": 0, "l": 0, "a": 1},
                  hex: "#000000",
                  hex8: "#000000FF",
                  rgba: { "r": 0, "g": 0, "b": 0, "a": 1},
                  hsv: { "h": 1.5788509971217104, "s": 0, "v": 0, "a": 1},
                  oldHue: 1.5788509971217104,
                  source: "hex",
                  a: 1
                },
                newAccentColor: {
                  hsl: { "h": 0.789280941611842, "s": 0, "l": 1, "a": 1 },
                  hex: "#FFFFFF",
                  hex8: "#FFFFFFFF",
                  rgba: { "r": 255, "g": 255, "b": 255, "a": 1 },
                  hsv: { "h": 0.789280941611842, "s": 0, "v": 1, "a": 1 },
                  oldHue: 0.789280941611842,
                  source: "hex",
                  a: 1
                },
                newThemeName: "",
                
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
                     let theme = 'blue'
                     // this.getCustomTheme(newTheme);

                     isCustom = theme.length > 0 ? true : false;
                }

                this.$emit('jsc_theme_change', {
                    name: newTheme,
                    colors: themeColors,
                    isCustom
                });
            },
           
            getColorForItem (item) {
                // var filteredThemes = this.themes.filter(theme=>{
                //     return theme.name === item.name
                // })
                // return filteredThemes ? filteredThemes[0].themeColors.fifth : "#000"
                return this.themes.filter(theme=>{
                    return theme.name === item.name
                })[0].themeColors.fifth
            },
            saveTheme() {
                // Filter the theme name for any special characters or spaces.
                this.newThemeName = this.newThemeName.replace(/[^a-zA-Z ]/g, "")
                this.newThemeName = this.newThemeName.replace(/\s+/g, '-');
                this.newThemeName = this.newThemeName.toLowerCase()
                

                let firstColor, lastColor

                if (this.newPrimaryColor.hsl.l > this.newAccentColor.hsl.l) {
                    firstColor = this.newAccentColor
                    lastColor = this.newPrimaryColor
                } else {
                    firstColor = this.newPrimaryColor
                    lastColor = this.newAccentColor
                }
                // console.log(firstColor.hex)
                // console.log(lastColor.hex)
                
                var f = chroma.scale([firstColor.hex, lastColor.hex])
                
                var second = f((1/7))
                var third = f((2/7))
                var fourth = f((3/7))
                var fifth = f((4/7))
                var sixth = f((5/7))
                var seventh = f((6/7))
                
                let payload = {
                    themeColors: {
                        first: firstColor.hex,
                        second: second.hex(),
                        third: third.hex(),
                        fourth: fourth.hex(),
                        fifth: fifth.hex(),
                        sixth: sixth.hex(),
                        seventh: seventh.hex(),
                        eighth: lastColor.hex,
                        vuetifyLight: lastColor.hex,
                        vuetifyDark: firstColor.hex
                    },
                    name: this.newThemeName,
                    isCustom: true
                };
                debugger
                this.$store.commit("saveCustomTheme", payload)
                this.chooseTheme(payload.name)


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