
def commit_id
pipeline {
    agent any
    stages {
        stage('Preparation') {
            steps {
                checkout scm
                sh "git rev-parse --short HEAD > .git/commit-id"
                script {
                    commit_id = readFile('.git/commit-id').trim()
                }                   
            }
        }
        stage('test') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs') {
                    sh 'npm install --only=dev'
                    sh 'npm test'
                }
            }
        }
        stage('deploy') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        def app = docker.build("raman1688/nagp-jenkins-docker:${commit_id}", '.').push()
                    }
                }
            }
        }
    }
}