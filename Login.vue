<template>
    <div class="login">
        <Container>
            <div class="login__card">
                <Box :margin-top="10">
                    <Form @submit.prevent="login">
                        <Box>
                            <Text v-if="errorState.message" error>
                                {{ errorState.message }}
                            </Text>
                        </Box>
                        <Stack>                       
                            <TextField 
                                label="email" 
                                v-model="email" 
                                :error="errorState.email" 
                                required 
                            />
                            <TextField 
                                label="password" 
                                type="password" 
                                v-model="password" 
                                :error="errorState.password" 
                                required 
                            />
                            <Box :margin-top="20">
                                <Button type="submit" :full-width="true" :loading="isLoading">
                                    Log In
                                </Button>
                            </Box>
                        </Stack>
                    </Form>
                </Box>
            </div>
        </Container>
    </div>
</template>

<script setup>
import Container from '@/components/Container'
import Stack from "@/components/Stack"
import Form from "@/components/Form"
import Box from "@/components/Box"
import TextField from "@/components/TextField"
import Button from "@/components/Button"
import Text from "@/components/Text"

import { useFetch } from '@/composables/fetch'

import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorState = reactive({
    email: false,
    password: false,
    message: ''
})

function isEmail() {
    var re = /\S+@\S+\.\S+/
    return re.test(email.value)
}

function passwordCorrect() {
    return password.value.length > 0
}

async function login() {
    if (!isEmail()) {
        errorState.email = true
        errorState.message = 'email has to be valid'
        return
    }

    if (!passwordCorrect()) {
        errorState.password = true
        errorState.message = 'password cannot be blank'
        return
    }

    isLoading.value = true

    const res = await useFetch('post', '/login', {
        email: email.value,
        password: password.value
    })

    const statusCode = res.status
    if (statusCode >= 400 && statusCode < 500) {
        errorState.message = res.data.error
        isLoading.value = false
    }

    const token = res.data.token
    store.dispatch('auth', token)
    router.push({ name: 'home' })
}
</script>

<style scoped>
    .login__card {
        width: 30%;
        margin: 0 auto;
    }
</style>
