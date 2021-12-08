
def commit_id
pipeline {
    agent {
        label 'docker-agent'
    }
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
                script {
                    def testContainer = docker.image('node')
                    testContainer.pull()
                    testContainer.inside {
                        sh 'npm install --only=dev'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('test with a DB') {
            steps {
                script {
                    def mysql = docker.image('mysql').run("-e MYSQL_ALLOW_EMPTY_PASSWORD=yes") 
                    def testContainer = docker.image('node')
                    testContainer.pull()
                    testContainer.inside("--link ${mysql.id}:mysql") { // using linking, mysql will be available at host: mysql, port: 3306
                        sh 'npm install --only=dev' 
                        sh 'npm test'                     
                    }                                   
                    mysql.stop()
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