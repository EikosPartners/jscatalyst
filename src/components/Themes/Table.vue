<template>
  <v-card>
    <v-card-title>
      Table
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
      >
      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog
            lazy
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.name"
              single-line
              counter
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.columnOne }}</td>
        <td class="text-xs-right">{{ props.item.columnTwo }}</td>
        <td class="text-xs-right">{{ props.item.columnThree }}</td>
        <td class="text-xs-right">{{ props.item.columnFour }}</td>
        <td class="text-xs-right">{{ props.item.columnFive }}</td>
        <td class="text-xs-right">{{ props.item.columnSix }}</td>
        <td class="text-xs-right">
          <v-edit-dialog
            @open="tmp = props.item.columnSeven"
            @save="props.item.columnSeven = tmp || props.item.columnSeven"
            large
            lazy
          >
            <div>{{ props.item.columnSeven }}</div>
            <div slot="input" class="mt-3 title">Update Iron</div>
            <v-text-field
              slot="input"
              label="Edit"
              v-model="tmp"
              single-line
              counter
              autofocus
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
  export default {
    name: 'theme-table',
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Header Title',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Column 1', value: 'columnOne' },
          { text: 'Column 2', value: 'columnTwo' },
          { text: 'Column 3', value: 'columnThree' },
          { text: 'Column 4', value: 'columnFour' },
          { text: 'Column 5', value: 'columnFive' },
          { text: 'Column 6', value: 'columnSix' },
          { text: 'Column 7', value: 'columnSeven' }
        ],
        items: [
          {
            value: false,
            name: 'Column 1',
            columnOne: 159,
            columnTwo: 6.0,
            columnThree: 24,
            columnFour: 4.0,
            columnFive: 87,
            columnSix: '14%',
            columnSeven: '1%'
          },
          {
            value: false,
            name: 'Column 2',
            columnOne: 237,
            columnTwo: 9.0,
            columnThree: 37,
            columnFour: 4.3,
            columnFive: 129,
            columnSix: '8%',
            columnSeven: '1%'
          },
          {
            value: false,
            name: 'Column 3',
            columnOne: 262,
            columnTwo: 16.0,
            columnThree: 23,
            columnFour: 6.0,
            columnFive: 337,
            columnSix: '6%',
            columnSeven: '7%'
          },
          {
            value: false,
            name: 'Column 4',
            columnOne: 305,
            columnTwo: 3.7,
            columnThree: 67,
            columnFour: 4.3,
            columnFive: 413,
            columnSix: '3%',
            columnSeven: '8%'
          },
          {
            value: false,
            name: 'Column 5',
            columnOne: 356,
            columnTwo: 16.0,
            columnThree: 49,
            columnFour: 3.9,
            columnFive: 327,
            columnSix: '7%',
            columnSeven: '16%'
          },
          {
            value: false,
            name: 'Column 6',
            columnOne: 375,
            columnTwo: 0.0,
            columnThree: 94,
            columnFour: 0.0,
            columnFive: 50,
            columnSix: '0%',
            columnSeven: '0%'
          },
          {
            value: false,
            name: 'Column 7',
            columnOne: 392,
            columnTwo: 0.2,
            columnThree: 98,
            columnFour: 0,
            columnFive: 38,
            columnSix: '0%',
            columnSeven: '2%'
          },
          {
            value: false,
            name: 'Column 8',
            columnOne: 408,
            columnTwo: 3.2,
            columnThree: 87,
            columnFour: 6.5,
            columnFive: 562,
            columnSix: '0%',
            columnSeven: '45%'
          },
          {
            value: false,
            name: 'Column 9',
            columnOne: 452,
            columnTwo: 25.0,
            columnThree: 51,
            columnFour: 4.9,
            columnFive: 326,
            columnSix: '2%',
            columnSeven: '22%'
          },
          {
            value: false,
            name: 'Column 10',
            columnOne: 518,
            columnTwo: 26.0,
            columnThree: 65,
            columnFour: 7,
            columnFive: 54,
            columnSix: '12%',
            columnSeven: '6%'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
