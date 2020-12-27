<template>
  <div class="img-home-card card-container mx-auto">
    <div class="card text-left">
      <h1 class="m-0 card-h1 display-4" style="margin-top: -10px !important;">
        De Giorgi's
      </h1>
      <h1 class="m-0 card-h1 display-4">Card</h1>
      <div class="mt-3" style="position: absolute; bottom: 10px;">
        <code class="card-code">{{ cardId }}</code>
        <div class="d-flex mt-2 ml-5">
          <div class="mr-2 my-auto">
            <p class="card-code card-small-code m-0">VALIDA</p>
            <p class="card-code card-small-code m-0">FINO A</p>
          </div>
          <p class="card-code my-auto m-0">{{ expirationDate }}</p>
        </div>
        <p class="card-code mt-2" style="color: white;">{{ fullName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardId: {
      type: String,
      default: "8294 8173 6767 5600 3634",
    },

    expirationDate: {
      type: String,
      default: "9/21",
    },

    fullName: {
      type: String,
      default: "Mario rossi",
    },
  },
};
</script>
