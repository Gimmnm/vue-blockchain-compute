<template>
  <div>
    <md-table v-model="localTransaction" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Buyer_id">{{ item.buyer_id }}</md-table-cell>
        <md-table-cell md-label="Buyer_name">{{ item.buyer_name }}</md-table-cell>
        <md-table-cell md-label="Bid_amount">{{ item.bid_amount }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
    transaction: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: [],
      localTransaction:[ ...this.transaction ]
    };
  },
};
</script>
