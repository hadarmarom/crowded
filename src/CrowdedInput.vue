<template>
  <div class="container">
    <!-- first option with datalist, the second with ul, li
    datalist is not friendly css wise so i chose to stick to the ul method -->

    <!-- <input
      type="text"
      placeholder="Type in here..."
      list="countries"
      @input="onChange"
      v-model="search"
      @change="selectItem"
    />
    <datalist id="countries" class="auto-list">
      <option v-for="(result, idx) in results" :key="idx" class="auto-res">
        {{ result }}
      </option>
    </datalist> -->

    <button @click="reset">Reset</button>
    <input
      ref="inputRef"
      type="text"
      placeholder="Type in here..."
      list="countries"
      @input="onChange"
      v-model="search"
      @change="selectItem"
    />
    <ul v-show="isOpen" class="auto-list">
      <li
        v-for="(result, idx) in results"
        :key="idx"
        @click="setResult(result)"
        class="auto-res"
      >
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CrowdedInput",
  props: ["options"],
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
    };
  },
  methods: {
    setResult(result) {
      this.search = result;
      this.isOpen = false;
    },
    selectItem() {
      this.$emit("onSelect");
    },
    filterResults() {
      this.results = this.options.filter(
        //I took the filter from the enternet😅
        (option) => option.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    reset() {
      // this.search = "";// another option to reset the input without using ref
      this.$refs.inputRef.value = null;
    },
  },
};
</script>


<style>
* {
  font-family: "Nunito", sans-serif;
  box-sizing: border-box;
}

.container {
  width: 340px;
}
button {
  margin-bottom: 10px;
}
input {
  height: 40px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 5px #888888;
  text-transform: capitalize;
  padding: 0 15px;
  font-size: unset;
  color: #5a5656;
  width: 100%;
}
input:focus-visible {
  box-shadow: 0 0 5px #5cc3f3;
  outline: #30cafd 2px solid;
}

.auto-list {
  border-radius: 5px;
  border: none;
  padding: 0;
  margin: 2px 0;
  max-height: 120px;
  overflow: auto;
  width: 100%;
  box-shadow: 0 0 3px #888888;
}

.auto-res {
  list-style: none;
  text-align: left;
  padding: 6px 14px;
  cursor: pointer;
  color: #5a5656;
}
.auto-res:hover {
  background-color: #5cc3f3;
  color: white;
}

/* -----------------------scroll----------------------- */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1px grey;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #5cc3f3;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5cc3f3;
}
  /* -----------------------scroll----------------------- */
</style>