pipeline {
    agent {
        label 'docker-agent'
    }
    def commit_id
    stages {
        stage('Preparation') {
            checkout scm
            sh "git rev-parse --short HEAD > .git/commit-id"                        
            commit_id = readFile('.git/commit-id').trim()
        }
        stage('test') {
            nodejs(nodeJSInstallationName: 'nodejs') {
            sh 'npm install --only=dev'
            sh 'npm test'
            }
        }
        stage('docker build/push') {
            docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
            def app = docker.build("raman1688/nagp-jenkins-docker:${commit_id}", '.').push()
            }
        }
    }
}
