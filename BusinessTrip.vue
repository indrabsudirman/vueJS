<template>
  <Form @submit.prevent="businessTrip">
    <div class="business_trip">
      <Container>
        <div class="business__trip">
          <Box>
            <Text v-if="errorState.message" error>{{
              errorState.message
            }}</Text>
          </Box>
          <Box margin-top="10">
            <Stack>
              <TextField
                label="purpose"
                v-model="purpose"
                :error="errorState.purpose"
                required
              ></TextField>
              <Box margin-top="10">
                <TextField
                  label="date of departure"
                  type="date"
                  v-model="depart_date"
                  :error="errorState.depart_date"
                  required
                ></TextField>
              </Box>
              <Box margin-top="10">
                <TextField
                  label="date of return"
                  type="date"
                  v-model="return_date"
                  :error="errorState.return_date"
                  required
                ></TextField>
              </Box>
              <TextField
                label="city"
                v-model="city"
                :error="errorState.city"
              ></TextField>
              <TextArea
                label="remark"
                v-model="remark"
                :error="errorState.remark"
                required
              ></TextArea>
              <Box :marginTop="20">
                <Button type="submit" :full-width="true"> Submit </Button>
              </Box>
              <Box :marginTop="20"
                ><Button @click="getAllBusinessTrip" :full-width="true">
                  Get All Business Trip
                </Button>
              </Box>
              <Box :marginTop="20"
                ><Button @click="updateBusinessTrip" :full-width="true">
                  Update Business Trip HR
                </Button>
              </Box>
            </Stack>
          </Box>
        </div>
      </Container>
    </div>
  </Form>
</template>

<script setup>
import Container from "@/components/Container";
import Form from "@/components/Form/index.vue";
import Box from "@/components/Box/index.vue";
import Stack from "@/components/Stack/index.vue";
import TextField from "@/components/TextField/index.vue";
import TextArea from "@/components/TextArea/index.vue";
import Button from "@/components/Button";
import { ref, reactive } from "vue";
import axios from "axios";
import { useFetch } from "@/composables/fetch";

let purpose = ref("");
let depart_date = ref("");
let return_date = ref("");
let city = ref("");
let remark = ref("");
const isLoading = ref(false);
const errorState = reactive({
  purpose: false,
  depart_date: false,
  return_date: false,
  city: false,
  remark: false,
  message: "",
});

function isPurpose() {
  return purpose.value.length > 0;
}
function isDapartDate() {
  return depart_date.value.length > 0;
}
function isReturnDate() {
  return return_date.value.length > 0;
}
function isCity() {
  return city.value.length > 0;
}

async function businessTrip() {
  if (!isPurpose()) {
    errorState.purpose = true;
    errorState.message = "purpose cannot be blank";
    return;
  }
  if (!isDapartDate()) {
    errorState.depart_date = true;
    errorState.message = "depart date cannot be blank";
    return;
  }
  if (!isReturnDate()) {
    errorState.return_date = true;
    errorState.message = "return date cannot be blank";
    return;
  }
  if (!isCity()) {
    errorState.city = true;
    errorState.message = "city cannot be blank";
    return;
  }

  isLoading.value = true;

  const res = await useFetch("post", "/business_trip/", {
    purpose: purpose.value,
    depart_date: depart_date.value,
    return_date: return_date.value,
    city: city.value,
    remark: remark.value,
  });

  const statusCode = res.status;
  if (statusCode >= 400 && statusCode < 500) {
    errorState.message = res.data.error;
    isLoading = false;
    return;
  }
  
  console.log("response data", res.data);
}
</script>


<style scoped>
.business__trip {
  width: 30%;
  margin: 0 auto;
}
</style>
