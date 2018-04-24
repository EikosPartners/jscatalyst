<template>
    <div class="main">
        <p>{{ scrollPosition }}</p>
        <v-btn-toggle v-model="selectedSource">
          <v-btn @click="selectedBackend = 'local'; selectedMethod = 'paginate'">Local</v-btn>
          <v-btn @click="selectedBackend = 'mongo'; selectedMethod = 'paginate'">Mongo</v-btn>
          <v-btn @click="selectedBackend = 'mongo'; selectedMethod = 'paginate2'">Mongo2</v-btn>
          <v-btn @click="selectedBackend = 'postgres'; selectedMethod = 'paginate'">Postgres</v-btn>
        </v-btn-toggle>
        <div class="outer" v-on:scroll="scrollEvent">
            <table class="inner" :style="{ height: totalRows * rowHeight + 'px' }">
                <thead>
                  <tr>
                    <th v-for="header in columnDefs">{{ header.headerName }}</th>
                  </tr>
                </thead>
                <tr class="row" v-for="(row, index) in data" :key="row.id" :style="rowStyles(index)">
                    <td v-for="column in columnDefs">{{ row[column.field] }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedBackend: 'local',
      selectedMethod: 'paginate',
      columnDefs: [ { headerName: 'Row #', field: 'id' },
                    { headerName: 'Account', field: 'account' },
                    { headerName: 'Trader', field: 'trader' },
                    { headerName: 'Strategy', field: 'strategy' },
                    { headerName: 'Counterparty', field: 'counterparty' },
                    { headerName: 'CID', field: 'cid' },
                    { headerName: 'Ticker', field: 'ticker' },
                    { headerName: 'RIC', field: 'ric' },
                    { headerName: 'BBG', field: 'bbg' },
                    { headerName: 'Type', field: 'type' },
                    { headerName: 'Order ID', field: 'orderId' },
                    { headerName: 'Quantity', field: 'quantity' },
                    { headerName: 'Price', field: 'price' },
                    { headerName: 'Filled', field: 'filled' },
                    { headerName: 'Open', field: 'open' },
                    { headerName: 'Limit Price', field: 'limitPrice' },
                    { headerName: 'Filled Price', field: 'filledPrice' },
                    { headerName: 'Venue', field: 'venue' },
                    { headerName: 'Gateway', field: 'gateway' },
                    { headerName: 'Currency', field: 'currency' },
                    { headerName: 'Side', field: 'side' },
                    { headerName: 'Original Order ID', field: 'originalOrderId' },
                    { headerName: 'Rejected', field: 'rejected' },
                    { headerName: 'Rejected Reason', field: 'rejectedReason' },
                    { headerName: 'State', field: 'state' },
                    { headerName: 'Entry Method', field: 'entryMethod' },
                    { headerName: 'Transact Time', field: 'transactTime' },
                    { headerName: 'Placement Time', field: 'placementTime' },
                    { headerName: 'Ems Time', field: 'emsTime' }
                  ],
      totalRows: 1000000,
      rowHeight: 40,
      scrollPosition: 0,
      loadingBlock: 0,
      dataLoaded: {
        startRow: 0,
        endRow: 0
      },
      data: []
    };
  },
  methods: {
    scrollEvent(event) {
      this.scrollPosition = event.target.scrollTop;
      if(this.scrollPosition + 600 > this.loadedDataScrollPositions.end || this.scrollPosition < this.loadedDataScrollPositions.start) {
        window.requestAnimationFrame(() => {
          let startRow, endRow;
          if(this.scrollPosition + 600 > this.loadedDataScrollPositions.end) {
            startRow = Math.floor(this.scrollPosition / this.rowHeight);
            endRow = startRow + 100;
          }
          if(this.scrollPosition < this.loadedDataScrollPositions.start) {
            endRow = Math.floor((this.scrollPosition + 600) / this.rowHeight);
            startRow = Math.max(endRow - 100, 0);

          }
          axios
            .get(`/trades/${this.selectedBackend}/paginate`, {
              params: {
                startRow: startRow,
                endRow: endRow
              }
            })
            .then(response => {
              this.dataLoaded.startRow = startRow;
              this.dataLoaded.endRow = endRow;
              this.data = response.data.docs;
            });
        });
      }
    },
    rowStyles(rowIndex) {
      return {
        transform: `translate(0, ${rowIndex * this.rowHeight + this.loadedDataScrollPositions.start}px`
      };
    }
  },
  computed: {
    loadedDataScrollPositions() {
      return {
        start: this.dataLoaded.startRow * this.rowHeight,
        end: this.dataLoaded.endRow * this.rowHeight + this.rowHeight
      }
    }
  },
  mounted() {
    axios.get(`/trades/${this.selectedBackend}/paginate`, {
        params: {
          startRow: 0,
          endRow: 100
        }
      }).then(response => {
      this.dataLoaded.startRow = 0;
      this.dataLoaded.endRow = 100;
      this.data = response.data.docs;
    });
  }
};
</script>

<style scoped>

  .mover {
    /* position: absolute; */
  }
  .main {
    margin: 25px;
  }
  .outer {
    margin: 15px auto;
    width: 1200px;
    height: 600px;
    overflow: scroll;
  }

  .inner {
    position: relative;
    background: #cecece;
    height: 10000px;
  }

  .row {
    position: absolute;
    height: 40px;
    /* border: 1px solid black; */
  }

  td {
    border: solid 1px black;
  }

</style>
